import { Page, Text, View, Document, Font, StyleSheet } from '@react-pdf/renderer'

Font.register({
  family: 'sans-serif',
  fonts: [
    {
      src: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap',
      fontWeight: 700,
    },
    {
      src: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap',
      fontWeight: 800,
    },
  ],
})
const pdfStyles = StyleSheet.create({
  page: {
    width: '100%',
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
  },
  section: {
    flex: '1',
    width: '100%',
    maxWidth: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 30,
    paddingBottom: 30,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    paddingBottom: 15,
  },
})

// Full documentation is on https://react-pdf.org/

const PdfPage = ({ transaction }) => {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <View style={pdfStyles.title}>
            <Text>Receipt</Text>
            <Text>
              Project {transaction.projectIndex}: {transaction.projectTitle}
            </Text>
          </View>
          <View>
            <Text>Transaction date: {transaction.transactionDate}</Text>
            <Text>Sum: {transaction.transactionSummary}</Text>
            <Text>Interval: {transaction.transactionInterval}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

// Full documentation is on https://react-pdf.org/

export default PdfPage
