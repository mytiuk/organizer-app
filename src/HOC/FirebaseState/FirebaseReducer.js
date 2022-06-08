import { LOADER_RUNNER, ADD_NOTE, 
        GET_NOTE, REMOVE_NOTE, 
        CLEAN_STATE, SING_UP, 
        SING_IN, USER_ID_UPDATER,
        LOG_OUT, ERROR, STOP_LOADER } from './actionType'

export const firebaseReducer = (state, action) => {

  switch(action.type) {

    case LOADER_RUNNER: 
      return {
        ...state,
        loading: true
      }
      case ADD_NOTE: 
        return {
          ...state,
          notes: [...state.notes, action.payload]
        }
        case GET_NOTE: 
          return {
            ...state, 
            notes: [...state.notes, action.payload],
            loading: false
          }
          case REMOVE_NOTE: 

           const cleanNote = state.notes.filter(item => item.id !== action.payload)
            return {
              ...state, 
              notes: cleanNote,
            }
            case CLEAN_STATE: 
              return {
                ...state, 
                notes: [],
              }
              case SING_UP: 
                return {
                  ...state, 
                  userId: action.payload,
                }
                case SING_IN: 
                  return {
                    ...state, 
                    userId: action.payload,
                    error: false
                  }
                  case USER_ID_UPDATER: 
                    return {
                      ...state, 
                      userId: action.payload,
                    }
                    case LOG_OUT: 
                      return {
                        ...state, 
                        userId: '',
                        notes: []
                      }
                      case ERROR: 
                        return {
                          ...state, 
                          error: true
                      }
                        case STOP_LOADER: 
                          return {
                            ...state, 
                            loading: false
                        }
      default: return state
  }
}