package com.infosys.lostFoundApplication.controller;

import com.infosys.lostFoundApplication.bean.ChatMessage;
import com.infosys.lostFoundApplication.bean.ChatMessage.MessageStatus;
import com.infosys.lostFoundApplication.bean.ChatMessage.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.UUID;

@RestController
@RequestMapping("/lostfound")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // online users for “Active now”
    private final Set<String> onlineUsers = new ConcurrentSkipListSet<>();
    private final Map<String, String> sessionIdToUser = new ConcurrentHashMap<>();

    // ===== REST: online users =====
    @GetMapping("/users")
    public Set<String> getOnlineUsers() {
        return onlineUsers;
    }

    // ===== WebSocket: register / presence =====
    @MessageMapping("/register")
    public void register(ChatMessage message, StompHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        String username = message.getSender();

        if (username != null && !username.trim().isEmpty()) {
            onlineUsers.add(username);
            sessionIdToUser.put(sessionId, username);
            broadcastUserList();
        }
    }

    // ===== WebSocket: send message to a conversation =====
    // client sends to: /app/conversations/{conversationId}/send
    @MessageMapping("/conversations/{conversationId}/send")
    public void sendMessage(@DestinationVariable String conversationId,
                            ChatMessage message) {

        // enrich message on server side
        if (message.getId() == null || message.getId().isEmpty()) {
            message.setId(UUID.randomUUID().toString());
        }
        message.setConversationId(conversationId);

        if (message.getType() == null) {
            message.setType(MessageType.TEXT);
        }
        if (message.getTimestamp() == 0L) {
            message.setTimestamp(System.currentTimeMillis());
        }
        if (message.getStatus() == null) {
            message.setStatus(MessageStatus.SENT);
        }

        // broadcast only to this conversation
        String destination = "/topic/conversations." + conversationId;
        messagingTemplate.convertAndSend(destination, message);
    }

    // ===== WebSocket: typing indicator =====
    // client sends to: /app/conversations/{conversationId}/typing
    @MessageMapping("/conversations/{conversationId}/typing")
    public void typing(@DestinationVariable String conversationId,
                       ChatMessage typingMessage) {

        typingMessage.setConversationId(conversationId);
        typingMessage.setType(MessageType.TYPING);
        typingMessage.setTimestamp(System.currentTimeMillis());

        String destination = "/topic/conversations." + conversationId + ".typing";
        messagingTemplate.convertAndSend(destination, typingMessage);
    }

    // ===== WebSocket: read receipt =====
    // client sends to: /app/conversations/{conversationId}/read
    @MessageMapping("/conversations/{conversationId}/read")
    public void read(@DestinationVariable String conversationId,
                     ChatMessage readMessage) {

        readMessage.setConversationId(conversationId);
        readMessage.setType(MessageType.READ_RECEIPT);
        readMessage.setStatus(MessageStatus.READ);
        readMessage.setTimestamp(System.currentTimeMillis());

        String destination = "/topic/conversations." + conversationId + ".read";
        messagingTemplate.convertAndSend(destination, readMessage);
    }

    // ===== presence cleanup (called by WebSocketEventListener) =====
    public void removeUser(String sessionId) {
        String username = sessionIdToUser.remove(sessionId);
        if (username != null) {
            onlineUsers.remove(username);
            broadcastUserList();
        }
    }

    // ===== broadcast updated user list =====
    private void broadcastUserList() {
        messagingTemplate.convertAndSend("/topic/users", onlineUsers);
    }
}