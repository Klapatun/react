import React from 'react';
import ReactDom from 'react-dom';
import PropTypes, { func } from 'prop-types';
import './styles.css';

/**
    Допиши конвертер валют.
    - Если пользователь ввел значение в рублях, то количество евро обновляется согласно курсу
    - Если пользователь ввел значение в евро, то количество рублей обновляется согласно курсу
 */

const RUBLES_IN_ONE_EURO = 70;

class MoneyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.status = {
      value: Array(2).fill(0)
    };
  }

  handleClick(value, currency) {
    const valueArr = this.status.value;

    if(currency === 'rub') {
      valueArr[0] = value;
      valueArr[1] = value/RUBLES_IN_ONE_EURO;
    }
    else if(currency === 'evr') {
      valueArr[0] = value*RUBLES_IN_ONE_EURO;
      valueArr[1] = value;
    }

    this.setState({ value: valueArr });
  }

  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money 
              value={this.status.value[0]}
              currency='rub'
              onChange={this.handleClick.bind(this)}
            />
            &mdash;
            <Money 
              value={this.status.value[1]}
              currency='evr'
              onChange={this.handleClick.bind(this)}
            />
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }
}

function Money(props) {

  const handleChangeValue = event => {
    const value = extractNumberString(event.target.value);
    props.onChange(value, props.currency);
  };

  return (
    <input
      type="text"
      value={props.value}
      onChange={handleChangeValue}
    />
  );
}

Money.propTypes = {
  value: PropTypes.symbol,
  currency: PropTypes.string,
  onChange: PropTypes.func
};

function extractNumberString(value) {
  const str = value.replace(/^0+/g, '').replace(/[^\.0-9]/g, '');
  const parts = str.split('.');
  return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str;
}

ReactDom.render(<MoneyConverter />, document.getElementById('app'));

/**
    Подсказки:
    - Сейчас каждый компонент Money хранит свое значение в собственном состоянии,
      чтобы конвертер работал, нужно уметь обновлять значение извне, поэтому нужно получать его из props.
    - В MoneyConverter наоборот надо создать состояние, которое будет хранить значения в обеих валютах.
      Таким образом ты сделаешь Lift State Up.
    - Заметь, что компонент Money теперь не содержит состояние и его можно переделать в функциональный компонент.
 */
