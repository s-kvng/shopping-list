import { useEffect, useContext  } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemsContext } from '../context/ItemsContext';
import NavBar from '../components/NavBar/NavBar';
import ListItem from '../components/ListItem/ListItem';

const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

function ListDetail() {
  let navigate = useNavigate();
  const { listId } = useParams();

  const { loading , error , items , fetchItems } = useContext(ItemsContext);

  console.log(items);
  console.log("length "+ !items.length)
 

  /*The preceding useEffect Hooks call the fetchItems 
  function when there's a listId
  present in the URL of the page*/
  useEffect(() => {

    listId && fetchItems(listId);

  }, [fetchItems ,listId ]);


  return (
    <>
      {navigate && (
        <NavBar
          goBack={() => navigate(-1)}
          openForm={() => navigate(`/list/${listId}/new`)}
        />
      )}
      <ListItemWrapper>
        {loading || error ? (
          <span>{error || 'Loading...'}</span>
        ) : (
          items.map((item) => <ListItem key={item.id} data={item} />)
        )}
      </ListItemWrapper>
    </>
  );
}

export default ListDetail;
