import { Row, Button } from "atomize";

const Pagination = ({ pageCount, setActivePage }) => {
  let pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(
      <Button key={i} m={{ x: ".5rem" }} onClick={(e) => setActivePage(i)}>
        {i + 1}
      </Button>
    );
  }
  return <Row>{pageCount > 1 && pages}</Row>;
};

export default Pagination;
