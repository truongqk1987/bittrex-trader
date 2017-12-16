import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import { Container, Row, Col } from 'reactstrap';
import './market-info.css';
import { Card, CardImg, CardText, CardBlock,
    CardTitle, CardSubtitle, Button } from 'reactstrap';


class MarketInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        summaryMarket: null,
        intervalId: null,
      }
      this.getMarketSummary = this.getMarketSummary.bind(this);
    }
  
    componentDidMount() {
      const self = this;
      const intervalId = setInterval(self.getMarketSummary, 1000);
      this.setState({intervalId});
    }

    getMarketSummary() {
        const {market} = this.props;
        const marketCurrency= market.MarketCurrency;
        axios.get(`https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-${marketCurrency}`)
        .then((response) => {
            const summaryMarket = response.data.result[0];
            this.setState({summaryMarket});
        })
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
  
    render() {
      const {market} = this.props;
      const {summaryMarket} = this.state;
      let renderer = <div className="loader"></div>
      if (summaryMarket && market) {
        renderer = (
          <Card>
              <CardBlock>
                <CardTitle>{market.MarketCurrencyLong}</CardTitle>
                <div>
                    <Row>
                        <Col xs="6">Total BTC:</Col>
                    </Row>
                    <Row>
                        <Col xs="12">{summaryMarket.Volume.toFixed(9)}</Col>
                    </Row>
                    <Row>
                        <Col xs="6">Bid:</Col>
                        <Col xs="6">{summaryMarket.Bid.toFixed(9)}</Col>
                    </Row>
                    <Row>
                        <Col xs="6">Ask:</Col>
                        <Col xs="6">{summaryMarket.Ask.toFixed(9)}</Col>
                    </Row>
                    <Row>
                        <Col xs="6">Last Price:</Col>
                        <Col xs="6">{summaryMarket.Last.toFixed(9)}</Col>
                    </Row>
                    <Row>
                        <Col xs="6">Buy Orders:</Col>
                        <Col xs="6">{summaryMarket.OpenBuyOrders}</Col>
                    </Row>
                    <Row>
                        <Col xs="6">Sell Orders:</Col>
                        <Col xs="6">{summaryMarket.OpenSellOrders}</Col>
                    </Row>
                </div>
            </CardBlock>
          </Card>
        )
      }
      return renderer;
    }
  }

  export default MarketInfo
  