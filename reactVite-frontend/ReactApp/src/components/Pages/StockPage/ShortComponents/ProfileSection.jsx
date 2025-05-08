import React from 'react';
import styled from 'styled-components';

const executives = [
  { name: "Mr. Sandeep Tewari", title: "Managing Director of Corporate Banking", pay: "0", year: "1963" },
  { name: "Mr. Pravin Raghavendra", title: "Deputy MD & Chief Operating Officer", pay: "0", year: "N/A" },
  { name: "Mr. Nitin Chugh", title: "Deputy MD and Head of Digital Banking & …", pay: "0", year: "1972" },
  { name: "Mr. Binod Kumar Mishra", title: "Deputy MD of HR & Corporate Development …", pay: "0", year: "N/A" },
  { name: "Mr. Rama Mohan Rao Amara", title: "MD of International Banking, Global Mark…", pay: "0", year: "N/A" },
  { name: "Ms. Saloni Narayan", title: "Deputy Managing Director of Finance", pay: "0", year: "N/A" }
];

const companyInfo = {
  ceo: "Mr. Ashwini Kumar Tewari",
  sector: "Financial Services",
  industry: "Banks - Regional",
  website: "https://www.sbi.co.in",
  exchange: "NSE",
  cik: "N/A",
  isin: "INE062A01020",
  cusip: "Y8155P103",
  address: "State Bank Bhavan",
  phone: "91 22 2274 0841",
  country: "IN",
  employee: "232,296",
  ipo: "Jan 1, 1996"
};

const Container = styled.div`
  background-color: #0b0c10;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
  padding: 2rem;
  line-height: 1.6;
`;

const Section = styled.section`
  background-color: #16171f;
  border-radius: 10px;
  padding: 1.8rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.5);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  font-weight: 600;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoBlock = styled.div`
  font-size: 0.95rem;
`;

const Label = styled.div`
  font-weight: 600;
  color: #aaa;
`;

const StyledLink = styled.a`
  color: #4da6ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #ccc;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.95rem;

  th, td {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid #2a2b36;
  }

  th {
    color: #aaa;
    font-weight: 500;
    font-size: 0.9rem;
  }

  td {
    color: #eee;
  }
`;

const ProfileSection = ({ name = "State Bank of India" }) => {
  return (
    <Container>
      <Section>
        <SectionTitle>About</SectionTitle>
        <InfoGrid>
          <InfoBlock><Label>CEO</Label>{companyInfo.ceo}</InfoBlock>
          <InfoBlock><Label>Sector</Label>{companyInfo.sector}</InfoBlock>
          <InfoBlock><Label>Industry</Label>{companyInfo.industry}</InfoBlock>
          <InfoBlock><Label>Website</Label><StyledLink href={companyInfo.website} target="_blank">{companyInfo.website}</StyledLink></InfoBlock>
          <InfoBlock><Label>Exchange</Label>{companyInfo.exchange}</InfoBlock>
        </InfoGrid>

        <Description>
          {name} provides banking products and services to individuals, commercial enterprises, corporates,
          public bodies, and institutional customers in India and internationally. The company operates
          through Treasury, Corporate/Wholesale Banking, Retail Banking, Insurance Business, and Other Banking
          segments...<br /><br />
          {name} was founded in 1806 and is headquartered in Mumbai, India.
        </Description>

        <InfoGrid style={{ marginTop: '2rem' }}>
          <InfoBlock><Label>CIK</Label>{companyInfo.cik}</InfoBlock>
          <InfoBlock><Label>ISIN</Label>{companyInfo.isin}</InfoBlock>
          <InfoBlock><Label>CUSIP</Label>{companyInfo.cusip}</InfoBlock>
          <InfoBlock><Label>Address</Label>{companyInfo.address}</InfoBlock>
          <InfoBlock><Label>Phone</Label>{companyInfo.phone}</InfoBlock>
          <InfoBlock><Label>Country</Label>{companyInfo.country}</InfoBlock>
          <InfoBlock><Label>Employees</Label>{companyInfo.employee}</InfoBlock>
          <InfoBlock><Label>IPO Date</Label>{companyInfo.ipo}</InfoBlock>
        </InfoGrid>
      </Section>

      <Section>
        <SectionTitle>Key Executives</SectionTitle>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Pay</th>
              <th>Year Born</th>
            </tr>
          </thead>
          <tbody>
            {executives.map((exec, i) => (
              <tr key={i}>
                <td>{exec.name}</td>
                <td>{exec.title}</td>
                <td>{exec.pay}</td>
                <td>{exec.year}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </Container>
  );
};

export default ProfileSection;
