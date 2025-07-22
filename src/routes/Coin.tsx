import { useLocation, useParams } from "react-router";
import { Container, Header, Loader, Title } from "../styles/coins.styles";
import { useState } from "react";


function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation();

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Undefined..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
