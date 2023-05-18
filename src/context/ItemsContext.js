import { createContext, useCallback, useReducer } from "react";



export const ItemsContext = createContext();

const initialState = {
    items: [],
    loading: true,
    error: '',
};


const reducer = (state, action) => {

    switch (action.type) {
        case 'GET_ITEMS_SUCCESS':
            return {
                ...state,
                items: action.payload,
                loading: false,
            };

        case 'GET_ITEMS_ERROR':
            return {
                ...state,
                items: [],
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};


export const ItemsContextProvider = ({ children }) => {

    // const [loading, setLoading] = useState(true);
    // const [items, setItems] = useState([]);
    // const [error, setError] = useState('');

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchItems = useCallback(async (listId) => {
        try {


            const data = await fetch(`https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists/${listId}/items`);
            const result = await data.json();

            if (result) {
                // setItems(result);
                // setLoading(false);

                dispatch({
                    type: 'GET_ITEMS_SUCCESS',
                    payload: result
                });
            }

        } catch (error) {

            // setLoading(false);
            // setError(error.message);

            dispatch({
                type: 'GET_ITEMS_ERROR',
                payload: error.message
            });

        }

    }, []);


    // const [ loading , error , data ] = useDataFetching('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/items/')


    return (

        // <ItemsContext.Provider value={{ items, loading, error, fetchItems }} >
        //     {children}
        // </ItemsContext.Provider>

        <ItemsContext.Provider value={{ ...state , fetchItems}} >
            {children}
        </ItemsContext.Provider>
    );
};


export default ItemsContext;