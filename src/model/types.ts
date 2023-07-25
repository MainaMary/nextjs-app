export type CounterState = {
  value: number;
};
export type User = {
    id: number;
    name: string;
    email: number;
  };
  export enum ActionTypes  {
    textInput = "TEXT_INPUT",
    siginText = "SIGNIN_TEXT",
    reset = "RESET_STATE",
    login="LOG_OUT",
    logout="LOG_IN"
 }
 export  interface initialStateType {
  username: string,
  email:string,
  password:string
}
export interface LabelProps {
  children:string
}
export interface Inputprops {
  onChange: (x:any)=> void;
  type:string;
  name: string;
  placeholder? :string;
  value?:string;
  required?:boolean;
  multiple?: boolean

}
export interface Posts{
  userId:string,
  id:string,
  title:string,
  body:string

}
export interface Photos {
  albumId:string,
  id:string,
  title:string,
  url:string,
  thumbnailUrl:string
 
}