import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.css';
import MarketInfo from './components/MarketInfo';

const APIKEY = '4a8f293a18684f72ba7b6881ba9792fc';
const APISECRET = 'b379b37f637c4658b22f04ed36643448';


class BittrexComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      marketList: null,
      selectedMarketList: null,
    };
    this.onSelectMarketListChange = this.onSelectMarketListChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    axios.get('https://bittrex.com/api/v1.1/public/getmarkets ')
    .then(function (response) {
      let marketList = response.data.result;
      marketList = marketList.map((market) => {
        const combinedName = market.MarketCurrencyLong + ' (' + market.MarketCurrency + ')';
        market['combinedName'] = combinedName;
        return market
      })
      marketList = marketList.filter((market) => {
        return market.BaseCurrency === 'BTC';
      })
      self.setState({marketList});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onSelectMarketListChange(selectedMarketList) {
    this.setState({selectedMarketList})
  }

  render() {
    const {marketList, selectedMarketList} = this.state;
    let render = <div className="loader"></div>;
    if (marketList) {
      render = (
        <div>
          <Select
            onChange={this.onSelectMarketListChange}
            value={this.state.selectedMarketList}
            valueKey='MarketCurrency'
            labelKey='combinedName'
            options={marketList}
            multi
          />
          <div className="card-container">
            {selectedMarketList && selectedMarketList.map((selectedMarket, index) => {
              return (
                <MarketInfo key={index} market={selectedMarket}/>
              )
            })}
          </div>
        </div>
      )
    }
    return render;
  }
}

const BittrexTrader = props => <BittrexComponent/>

ReactDOM.render(
  <BittrexTrader
  />

  , document.getElementById('root'));