import { useParams } from 'react-router-dom';

function PageTwo() {

  const { id } = useParams();

  return (
    <div>
        PageTwo {id}
    </div>
  )
}

export default PageTwo
