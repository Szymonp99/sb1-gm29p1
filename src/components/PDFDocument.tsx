import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import type { Service } from '../types';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    color: '#2B384A',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 50,
    objectFit: 'contain',
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2B384A',
    borderBottomStyle: 'solid',
    paddingVertical: 8,
  },
  tableHeader: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  tableCol: {
    flex: 1,
  },
  tableCell: {
    fontSize: 12,
    padding: 4,
  },
  total: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  },
  gradientBox: {
    width: '100%',
    height: 37,
    backgroundColor: '#FFC76B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  }
});

interface PDFDocumentProps {
  services: Service[];
  logo?: string;
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ services, logo }) => {
  const total = services.reduce((sum, service) => sum + service.price, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logo && <Image style={styles.logo} src={logo} />}
          <Text style={styles.title}>Plan leczenia</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Usługa</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Cena</Text>
            </View>
          </View>
          
          {services.map((service) => (
            <View key={service.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{service.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${service.price.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <Text>Suma: ${total.toFixed(2)}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.gradientBox}>
            <Text style={styles.contactInfo}>
              Przemysłowa 11 Tułowice  +48 606 895 304
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;