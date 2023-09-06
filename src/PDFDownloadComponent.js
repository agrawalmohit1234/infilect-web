import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
});

const PDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>{JSON.stringify(data)}</Text>
      </View>
    </Page>
  </Document>
);

function PDFDownloadComponent({ data }) {
  return (
    <div>
      <PDFDownloadLink
        document={<PDFDocument data={data} />}
        fileName="infilect_data.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <>
              {url && (
                <a href={url} download="infilect_data.pdf">
                  <DownloadIcon />
                </a>
              )}
            </>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}

export default PDFDownloadComponent;
