import React from "react";
import styled from "styled-components";
import { Br, H2, Heading } from "../common/components/atomic";
import CorrelationChart from "../containers/CorrelationChart";
import Footer from "../containers/Footer";
import EstimatedFees from "../containers/EstimatedFees";
import Header from "../containers/Header";
import Navbar from "../containers/navbar/Navbar";
import LiquidityPositionChart from "../containers/LiquidityPositionChart";
import SelectPairModal, {
  SelectPair,
} from "../containers/select-pair/SelectPairModal";
import Setting from "../containers/setting/Setting";
import { ScreenWidth } from "../utils/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FeedbackButton } from "../common/components/atomic";
import { useAppContext } from "../context/app/appContext";
import {
  faArrowDown,
  faArrowRight,
  faBug,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getCurrentNetwork } from "../common/network";
import ImpermanentLossModal from "../containers/ImpermanentLossModal";
import CreatePositionModal from "../containers/CreatePositionModal";
import TopPosition from "../containers/TopPosition";
import { Link } from "gatsby";
import { SEO } from "../common/components/Head";
import Pools from './pools';
import { getPath } from "../utils/querystring";


const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  grid-template-columns: 5fr 7fr;
  grid-gap: 25px;
  margin-top: 25px;

  @media only screen and (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }
`;
const BodyContainer = styled.div`
max-width: 1200px;
margin: auto;
padding-top: 20px;
padding-bottom: 20px;



  @media only screen and (max-width: 800px) {
    margin: auto 15px;
    padding-top: 85px;
  }
  @media only screen and (max-width: 720px) {
    grid-template-columns: 1fr;

    & > .select-pair {
      width: 300px;
      margin: auto auto;
    }
  }
  & .homeContainer{
    display: flex;
    flex-direction: row;
    gap: 12px;
    & > .select-pair {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      position: relative;
      min-width: 280px;
    }
  }
  & .poolPos{

    display: flex;
    flex-direction: column;
    }
  & .poolCharts{
    display: flex;
    flex-direction: column;
    flex: auto;
  }
  & .top-pools {
    display: block;
    color: #bbb;
    cursor: pointer;
    font-size: 0.875rem;
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.175);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    text-decoration: none;
    transition: 0.3s;
    margin-top: 18px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    & > div:nth-child(1) {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }

`;

const Landing = styled.div`
  & p {
    color: #bbb;
  }


  & .top-pools {
    display: block;
    color: #bbb;
    cursor: pointer;
    font-size: 0.875rem;
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.175);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    text-decoration: none;
    transition: 0.3s;
    margin-top: 18px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    & > div:nth-child(1) {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
  & .calculator {
    color: #bbb;
    font-size: 0.875rem;
    padding: 16px;

    & svg {
      margin-left: 5px;
    }

    & .down {
      display: none;
    }
  }

  @media only screen and (max-width: 720px) {
    & .calculator .right {
      display: none;
    }
    & .calculator .down {
      display: inline;
    }
  }
`;

function App() {
  const { state } = useAppContext();

  return (
    <>
    <BodyContainer>
      <SelectPairModal />
      <ImpermanentLossModal />
      <CreatePositionModal />

      {/* <FeedbackButton
        onClick={() => {
          const app_context = {
            token0: state.token0?.id,
            token1: state.token1?.id,
            chain: getCurrentNetwork().id,
            pool: state.pool?.id,
            depositAmount: state.depositAmountValue,
            priceRange: state.priceRangeValue,
            mostActivePrice: state.priceAssumptionValue,
          };
            return console.log({ app_context });
          }
        }
      >
        <FontAwesomeIcon icon={faBug} />
      </FeedbackButton>
       */}

      {!state.pool && !state.token0 && (
        
          <>
          <div className="homeContainer">
            <Pools />
            <div className="select-pair">
              <SelectPair fetchFromUrlParams={true} />
            </div>
          </div>
          </>
        
      )}

      {state.pool && state.network && (
        
          <>
          <Header />
          <div className="poolPos">
          <ContentContainer>
              <div>
                <EstimatedFees />
                <Br />
                <Setting />
              </div>
              <div className="poolCharts">
                <LiquidityPositionChart />
                <Br />
                <CorrelationChart />
              </div>
            </ContentContainer>
          </div>

          {!state.network.disabledTopPositions && (
            <>
              <Br />
              <TopPosition />
            </>
          )}
        </>
      )}
      </BodyContainer>
    </>
  );
}

export default App;
export const Head = () => {
  const title = "Forge DEX Analytics";
  const description =
    "Calculate your Forge position fee returns, APY, APR, ROI, yields, and IL. Track trending pools and tokens.";

  return <SEO title={title} description={description} />;
};
