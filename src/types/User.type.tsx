export interface User {
    memberNum?:number;
	memberId?:string;
	memberPassword?:string;
	memberName?:string;
	memberPhone?:string;
	memberEmail?:string;
	memberAddress?:string;
	memberRole?:string;
	memberImgPath?:string;
	credat?:string;
	lmodat?:string;
	active?:string;
	login?:boolean;
	sessionId?:string;
	loginDate?:string;
	token?:string;
	authorities?:any[];
	unreadCnt?:number;
}