export type  User={
    id:string;
    privyUserId:string;
    email?:string | null;
    appleEmail?:string | null;
    googleEmail ?: string | null;
    twitterUsername?: string | null;
    walltetAddress?:string
}