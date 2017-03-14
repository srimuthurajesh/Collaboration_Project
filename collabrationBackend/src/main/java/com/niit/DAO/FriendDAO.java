package com.niit.DAO;

import java.util.List;

import com.niit.Model.FriendModel;

public interface FriendDAO {
	public void addfriend(FriendModel friendModel);
	public List<FriendModel> notifications(String username);
	public void acceptfriend(FriendModel friendModel);
		
		
}
