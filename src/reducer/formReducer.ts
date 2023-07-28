import { ActionTypes, initialStateType } from "@/model/types";
interface IProps {
    key:string;
    value:string
}
interface Props {
    type:string;
    payload: IProps
}

const initialState = {
  username:'',
  email: '',
  password:''
}
export const formReducer = (state:initialStateType, action:Props) => {
    const {type, payload} = action
    switch (type) {
      case ActionTypes.registerText:
        return {
          ...state,
          [payload.key]: payload.value,
        };
      case ActionTypes.siginText:
        return {
          ...state,
          [payload.key]: payload.value
        }
      case  ActionTypes.reset:
        return {initialState}
      default:
        throw new Error(`Unknown action type: ${type}`);
    }
  };