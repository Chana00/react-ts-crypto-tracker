import { Link, Outlet, useLocation, useMatch, useParams } from "react-router";
import {
  Container,
  Header,
  Loader,
  Title,
  Overview,
  OverviewItem,
  Description,
  Tabs,
  Tab,
} from "../styles/coins.styles";
import { useState, useEffect } from "react";

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useMatch(":coinId/price");
  const chartMatch = useMatch(":coinId/chart");

  useEffect(() => {
    (async () => {
      try {
        const [infoRes, priceRes] = await Promise.all([
          fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`),
          fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`),
        ]);

        const infoData = await infoRes.json();
        const priceData = await priceRes.json();

        setInfo(infoData);
        setPriceInfo(priceData);
        setLoading(false);
      } catch (e) {
        console.error("API 호출 실패 : ", e);
      }
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : info?.name }</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : 
      <>
        <Overview>
          <OverviewItem>
            <span>Rank:</span>
            <span>{info?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Symbol:</span>
            <span>${info?.symbol}</span>
          </OverviewItem>
           <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
        </Overview>
         <Description>{info?.description?.replace(/<[^>]*>?/g, "")}</Description>
         <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={"/:coinId/chart"}>Chart</Link>
            </Tab>
             <Tab isActive={priceMatch !== null}>
              <Link to={"/:coinId/price"}>Price</Link>
            </Tab>
          </Tabs>

          {/* 하위 라우트 렌더링 */}
          <Outlet/>
      </>}
    </Container>
  );
}

export default Coin;
