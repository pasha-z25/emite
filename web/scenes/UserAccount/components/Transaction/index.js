import { PDFDownloadLink } from '@react-pdf/renderer'
import SVG from '~/components/SVG'
import { downloadIcon, updateIcon } from '~/utils/svgImages'
import PDF from '~/components/sections/Pdf'

import transactions from '../transactions.json'
import styles from './style.module.scss'

const getTableRow = (transaction) => {
  return (
    <div key={transaction.transactionId} className="grid-wrapper">
      <div className="grid-cell cell-1 data">{transaction.transactionDate}</div>
      <div className="grid-cell cell-2 data">{transaction.transactionId}</div>
      <div className="grid-cell cell-3 data">
        Project {transaction.projectIndex}: {transaction.projectTitle}
      </div>
      <div className="grid-cell cell-4 data">{transaction.transactionInterval}</div>
      <div className="grid-cell cell-5 data">${transaction.transactionSummary}</div>
      <div className="grid-cell cell-6 data">
        <PDFDownloadLink
          document={<PDF transaction={transaction} />}
          fileName={`transaction_${transaction.transactionId}.pdf`}
          className="icon"
        >
          {({ loading }) =>
            loading ? (
              <span className={styles.loading}>
                <SVG content={updateIcon()} size={24} />
              </span>
            ) : (
              <SVG content={downloadIcon()} size={24} />
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  )
}

export const Transaction = () => {
  return (
    <div className={`${styles.wrapper} content-wrapper`}>
      {/*
      <table width="100%">
        <thead>
          <tr className="small-text">
            <th>Date</th>
            <th>Donation ID</th>
            <th>№ Project name</th>
            <th>Frequency</th>
            <th>Amount given</th>
            <th />
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan="2">1-5 of 240 item</td>
            <td colSpan="4" align="right">
              PAGINATION
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td>June 16, 2021</td>
            <td>2132349123213</td>
            <td>
              <div>Project 1: Education for Kwaggafontein, Africa education for Kwaggafontein</div>
            </td>
            <td>One time</td>
            <td>$80.00</td>
            <td>
              <span className="icon pointer">
                <SVG content={downloadIcon()} size={24} />
              </span>
            </td>
          </tr>
          <tr>
            <td>June 16, 2021</td>
            <td>2132349123213</td>
            <td>Project 1: Education for Kwaggafontein, Africa</td>
            <td>Monthly</td>
            <td>$500.00</td>
            <td>
              <span className="icon pointer">
                <SVG content={downloadIcon()} size={24} />
              </span>
            </td>
          </tr>
          <tr>
            <td>June 16, 2021</td>
            <td>2132349123213</td>
            <td>Project 1: Education for Kwaggafontein, Africa</td>
            <td>Every month</td>
            <td>$100.00</td>
            <td>
              <span className="icon pointer">
                <SVG content={downloadIcon()} size={24} />
              </span>
            </td>
          </tr>
          <tr>
            <td>June 16, 2021</td>
            <td>2132349123213</td>
            <td>Project 1: Education for Kwaggafontein, Africa</td>
            <td>One time</td>
            <td>$80.00</td>
            <td>
              <span className="icon pointer">
                <SVG content={downloadIcon()} size={24} />
              </span>
            </td>
          </tr>
          <tr>
            <td>June 16, 2021</td>
            <td>2132349123213</td>
            <td>Project 1: Education for Kwaggafontein, Africa</td>
            <td>Monthly</td>
            <td>$500.00</td>
            <td>
              <span className="icon pointer">
                <SVG content={downloadIcon()} size={24} />
              </span>
            </td>
          </tr>
          <tr>
            <td>June 16, 2021</td>
            <td>2132349123213</td>
            <td>Project 1: Education for Kwaggafontein, Africa</td>
            <td>Every month</td>
            <td>$100.00</td>
            <td>
              <span className="icon pointer">
                <SVG content={downloadIcon()} size={24} />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      */}
      <div className="grid-wrapper head small-text border-r8px mb-1x">
        <div className="grid-cell head">Date</div>
        <div className="grid-cell head">Donation ID</div>
        <div className="grid-cell head">№ Project name</div>
        <div className="grid-cell head">Frequency</div>
        <div className="grid-cell head">Amount given</div>
        <div className="grid-cell head">&nbsp;</div>
      </div>
      {transactions.map((transaction) => getTableRow(transaction))}
      <div className="grid-wrapper foot small-text border-r8px mt-1x">
        <div className="grid-cell foot">1-5 of 240 item</div>
        <div className="grid-cell foot">PAGINATION</div>
      </div>
    </div>
  )
}
