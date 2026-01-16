package com.infosys.lostFoundApplication.bean;

public class FoundItemDTO implements Comparable<FoundItemDTO> {
	private String foundItemId;
    private String foundItemName;
    private String color;
    private String brand;
    private String category;
    private String location;
    private String username;  // person who found it
    private String foundDate;
    private Boolean status;
    public FoundItemDTO() {
    	super();
    }
    
    public FoundItemDTO(String foundItemId, String foundItemName, String color, String brand, String category,
			String location, String username, String foundDate, Boolean status) {
		super();
		this.foundItemId = foundItemId;
		this.foundItemName = foundItemName;
		this.color = color;
		this.brand = brand;
		this.category = category;
		this.location = location;
		this.username = username;
		this.foundDate = foundDate;
		this.status = status;
	}

    public FoundItemDTO(FoundItem foundItem) {
		super();
		this.foundItemId = foundItem.getFoundItemId();
		this.foundItemName = foundItem.getFoundItemName();
		this.color = foundItem.getColor();
		this.brand = foundItem.getBrand();
		this.category = foundItem.getCategory();
		this.location = foundItem.getLocation();
		this.username = foundItem.getUsername();
		this.foundDate = foundItem.getFoundDate();
		this.status = foundItem.getStatus();
	}
    
	public String getFoundItemId() {
		return foundItemId;
	}

	public String getFoundItemName() {
		return foundItemName;
	}

	public String getColor() {
		return color;
	}

	public String getBrand() {
		return brand;
	}

	public String getCategory() {
		return category;
	}

	public String getLocation() {
		return location;
	}

	public String getUsername() {
		return username;
	}

	public String getFoundDate() {
		return foundDate;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setFoundItemId(String foundItemId) {
		this.foundItemId = foundItemId;
	}

	public void setFoundItemName(String foundItemName) {
		this.foundItemName = foundItemName;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setFoundDate(String foundDate) {
		this.foundDate = foundDate;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public int compareTo(FoundItemDTO second) {
    	return this.foundItemId.compareTo(second.foundItemId);
    }

}
