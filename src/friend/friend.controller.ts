import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FriendService } from './friend.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) { }

  @Authorization()
  @Post("send-request/:receiverId")
  async sendFriendRequest(@Param("receiverId") receiverId: string, @Authorized("id") id: string) {
    return this.friendService.sendFriendRequest(id, receiverId)
  }

  @Authorization()
  @Patch("accept-request/:requestId")
  async acceptFriendRequest(@Param("requestId") requestId: string, @Authorized("id") id: string) {
    return this.friendService.acceptFriendRequest(requestId, id)
  }

  @Authorization()
  @Delete("decline-request/:requestId")
  async declineFriendRequest(@Param("requestId") requestId: string, @Authorized("id") id: string) {
    return this.friendService.declineFriendRequest(requestId, id)
  }

  @Get("get-friends/:userId")
  async getFriends(@Param("userId") userId: string) {
    return this.friendService.getFriends(userId)
  }

  @Authorization()
  @Get("get-incoming/:userId")
  async getIncomingRequests(@Param("userId") userId: string) {
    return this.friendService.getIncomingRequests(userId)
  }

  @Authorization()
  @Get("get-outgoing/:userId")
  async getOutgoingRequests(@Param("userId") userId: string) {
    return this.friendService.getOutgoingRequests(userId)
  }

  @Authorization()
  @Get("get-friends-events/:userId")
  async getFriendsEvents(@Param("userId") userId: string) {
    return this.friendService.getFriendsEvents(userId)
  }

  @Authorization()
  @Delete("delete-friend/:friendId")
  async delete(@Param("friendId") friendId: string, @Authorized("id") id: string) {
    return this.friendService.delete(id, friendId)
  }

}
