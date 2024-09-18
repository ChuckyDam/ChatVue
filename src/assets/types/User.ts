export interface UserMessage{
    // userId: string
    username: string
    avatarUrl?: string|null
}
export interface UserInfo{
    "name": string
    "friends": number[],
    "groups": number[],
    "friendsInvites": number[],
    "myInvites": number[],
}