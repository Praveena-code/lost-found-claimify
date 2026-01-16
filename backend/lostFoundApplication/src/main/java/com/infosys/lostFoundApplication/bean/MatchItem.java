package com.infosys.lostFoundApplication.bean;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

@Entity
public class MatchItem {

    @EmbeddedId
    private MatchItemId matchItemId;

    private String itemName;
    private String category;
    private String lostUsername;
    private String foundUsername;

    // ✅ Default constructor (required by JPA)
    public MatchItem() {
        super();
    }

    // ✅ Constructor with all fields
    public MatchItem(MatchItemId matchItemId, String itemName, String category,
                     String lostUsername, String foundUsername) {
        this.matchItemId = matchItemId;
        this.itemName = itemName;
        this.category = category;
        this.lostUsername = lostUsername;
        this.foundUsername = foundUsername;
    }

    // ✅ DTO-based constructor (VERY IMPORTANT – keeps other code working)
    public MatchItem(MatchItemDTO matchItemDTO) {
        this.matchItemId = new MatchItemId(
                matchItemDTO.getLostItemId(),
                matchItemDTO.getFoundItemId()
        );
        this.itemName = matchItemDTO.getItemName();
        this.category = matchItemDTO.getCategory();
        this.lostUsername = matchItemDTO.getLostUsername();
        this.foundUsername = matchItemDTO.getFoundUsername();
    }

    // ================= GETTERS & SETTERS =================

    public MatchItemId getMatchItemId() {
        return matchItemId;
    }

    public void setMatchItemId(MatchItemId matchItemId) {
        this.matchItemId = matchItemId;
    }

    // 🔹 Convenience getters (DO NOT break existing code)
    public String getLostItemId() {
        return matchItemId != null ? matchItemId.getLostItemId() : null;
    }

    public String getFoundItemId() {
        return matchItemId != null ? matchItemId.getFoundItemId() : null;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLostUsername() {
        return lostUsername;
    }

    public void setLostUsername(String lostUsername) {
        this.lostUsername = lostUsername;
    }

    public String getFoundUsername() {
        return foundUsername;
    }

    public void setFoundUsername(String foundUsername) {
        this.foundUsername = foundUsername;
    }
}
