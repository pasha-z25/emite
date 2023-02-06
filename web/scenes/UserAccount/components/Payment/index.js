import { useState } from 'react'
import { Input } from '~/sections/Form'
import SVG from '~/components/SVG'
import { dollarIcon, stopIcon } from '~/utils/svgImages'
import { checkValidateName } from '~/utils/validators'

import transactions from '../transactions.json'
import styles from '../../style.module.scss'

const transactionsEmptyList = []

const getTransactionsInfo = (transaction) => {
  const [menuStatus, setMenuStatus] = useState(false)
  return (
    <div key={transaction.transactionId} className="plan-transaction-item flex pt-3x pb-3x">
      <div className="content flex-1">
        <p className="bold">
          #{transaction.projectIndex}: {transaction.projectTitle}
        </p>
        <p className="small-text">
          Your next payment of{' '}
          <span className="bold">
            <span className="color-red">${transaction.transactionSummary}</span>/
            {transaction.transactionInterval}
          </span>{' '}
          occurs on <span className="bold">{transaction.transactionDate}</span>.
        </p>
      </div>
      <div className="menu pl-3x relative">
        <button className="menu-button" onClick={() => setMenuStatus(!menuStatus)}>
          <span />
          <span />
          <span />
        </button>
        <ul
          className={menuStatus ? 'menu-list border-r8px bg-white absolute box-shadow' : 'hidden'}
        >
          <li>
            <SVG content={dollarIcon()} size={24} /> Edit details
          </li>
          <li>
            <SVG content={stopIcon()} size={24} /> Cancel donation
          </li>
        </ul>
      </div>
    </div>
  )
}

export const Payment = () => {
  return (
    <div className={`${styles.wrapper} flex flex-wrap justify-center`}>
      <div className="card-wrapper w-100">
        <div className="payment-card border-r20px bg-white box-shadow pt-5x pb-3x pl-4x pr-4x">
          <h4 className="h4 bold color-darkgray mb-3x">Donation plans</h4>
          <hr className="light" />
          <div className="donationPlansWrapper">
            {transactions.length ? (
              <>{transactions.map((transaction) => getTransactionsInfo(transaction))}</>
            ) : (
              <>
                <p>no transactions</p>
              </>
            )}
          </div>
          <hr className="light" />
          <p className="text-center mt-3x">
            <a href="#" className="color-red">
              Add another donation +
            </a>
          </p>
        </div>
      </div>
      <div className="form-wrapper w-100 pt-5x ml-9x">
        <div className="payment-data">
          <h4 className="h4 bold color-darkgray mb-6x">Payment info</h4>
          <form>
            <div className="card-info flex">
              <Input
                id={'cardNumber'}
                inputName={'name'}
                placeholder={'xxxx-xxxx-xxxx-xxxx'}
                checkValidateValue={checkValidateName}
                // value={'name'}
                setValue={() => null}
                Errors={[]}
                setErrors={() => null}
              />
              <Input
                id={'expDate'}
                inputName={'name'}
                placeholder={'MM/YY'}
                className={'ml-2x'}
                style={{
                  maxWidth: '4.5rem',
                }}
                checkValidateValue={checkValidateName}
                // value={'name'}
                setValue={() => null}
                Errors={[]}
                setErrors={() => null}
              />
              <Input
                id={'secret'}
                inputName={'name'}
                placeholder={'***'}
                className={'ml-2x'}
                style={{
                  maxWidth: '4.5rem',
                }}
                checkValidateValue={checkValidateName}
                // value={'name'}
                setValue={() => null}
                Errors={[]}
                setErrors={() => null}
              />
            </div>
            <Input
              id={'line1'}
              inputName={'name'}
              placeholder={'Enter your address'}
              checkValidateValue={checkValidateName}
              setValue={() => null}
              Errors={[]}
              setErrors={() => null}
            />
            <div className="address flex">
              <Input
                id={'country'}
                inputName={'name'}
                placeholder={'Enter name'}
                checkValidateValue={checkValidateName}
                // value={'name'}
                setValue={() => null}
                Errors={[]}
                setErrors={() => null}
              />
              <Input
                id={'postalCode'}
                inputName={'postalCode'}
                placeholder={'ZIP'}
                className={'ml-2x'}
                style={{
                  maxWidth: '4.5rem',
                }}
                checkValidateValue={() => null}
                // value={'name'}
                setValue={() => null}
                Errors={[]}
                setErrors={() => null}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
