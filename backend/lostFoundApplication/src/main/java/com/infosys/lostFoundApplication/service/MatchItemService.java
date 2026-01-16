package com.infosys.lostFoundApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.lostFoundApplication.bean.FoundItem;
import com.infosys.lostFoundApplication.bean.LostItem;
import com.infosys.lostFoundApplication.bean.MatchItem;
import com.infosys.lostFoundApplication.bean.MatchItemDTO;
import com.infosys.lostFoundApplication.bean.MatchItemId;
import com.infosys.lostFoundApplication.dao.FoundItemDao;
import com.infosys.lostFoundApplication.dao.LostItemDao;
import com.infosys.lostFoundApplication.dao.MatchItemDao;

@Service
public class MatchItemService {

    @Autowired
    private LostItemDao lostItemDao;

    @Autowired
    private MatchItemDao matchItemDao;

    @Autowired
    private FoundItemDao foundItemDao;

    // ✅ GET ALL MATCHED ITEMS
    public List<MatchItem> getAllMatchedItems() {
        return matchItemDao.getAllMatchedItems();
    }

    // ✅ UPDATE STATUS + SAVE MATCH ITEM
    public void updateLostFoundItems(MatchItemDTO matchItemDTO) {

        String lostItemId = matchItemDTO.getLostItemId();
        String foundItemId = matchItemDTO.getFoundItemId();

        // 1️⃣ Update Lost & Found status
        LostItem lostItem = lostItemDao.getLostItemById(lostItemId);
        FoundItem foundItem = foundItemDao.getFoundItemById(foundItemId);

        lostItem.setStatus(true);
        foundItem.setStatus(true);

        lostItemDao.saveLostItem(lostItem);
        foundItemDao.saveFoundItem(foundItem);

        // 2️⃣ Create MatchItem using EmbeddedId
        MatchItemId matchItemId =
                new MatchItemId(lostItemId, foundItemId);

        MatchItem matchItem = new MatchItem();
        matchItem.setMatchItemId(matchItemId);
        matchItem.setItemName(matchItemDTO.getItemName());
        matchItem.setCategory(matchItemDTO.getCategory());
        matchItem.setLostUsername(matchItemDTO.getLostUsername());
        matchItem.setFoundUsername(matchItemDTO.getFoundUsername());

        // 3️⃣ Save MatchItem
        matchItemDao.saveMatchItem(matchItem);
    }
}
