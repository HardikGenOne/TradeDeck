import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components';

const API_BASE_URL = import.meta.env.VITE_API_KEY;


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;
  height: 100vh;
  box-sizing: border-box;
`;

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: black;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', sans-serif;
  height: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;

  text-align: center;
  color:white
`;

const ClearAll = styled.p`
  cursor: pointer;
  color: silver;
  text-align: right;
  margin: 0;
  
  &:hover {
    color: blue;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: silver;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: gray;
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap:20px;

  margin-bottom: 1.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: silver;

  input {
    margin-right: 0.5rem;
  }
`;

const Output = styled.div`
  flex: 3;
  padding: 2rem;
  background-color: #1e1e1e;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', sans-serif;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 100%;
`;

const Card = styled.div`
  background-color: #222;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  width: 300px;
  margin-bottom: 1rem;
  flex-shrink: 0;
`;

const Preformatted = styled.pre`
  white-space: pre-wrap;
  color: #fff;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-wrap: break-word;
`;

const Button = styled.button`
  color: white;
  background: gray;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #555;
  }
`;

function BacktestInputs() {
    let [strategiesFunctions, setStrategiesFunctions] = useState([]);
    const [selectedTimeframes, setSelectedTimeframes] = useState([]);
    const [stockSymbol, setStockSymbol] = useState('');
    const [period, setPeriod] = useState('');
    const [selectedStrategy, setSelectedStrategy] = useState('');
    const [loading, setLoading] = useState(false);
    const [outputMessage, setOutputMessage] = useState('');

    useEffect(() => {
        async function getStrategiesFunctions() {
            const response = await fetch(`${API_BASE_URL}/strategies/functions`)
            const result = await response.json()
            console.log(result)
            setStrategiesFunctions(result)
            if (result.length > 0) {
                setSelectedStrategy(result[0]);
            }
        }

        getStrategiesFunctions()

    }, [])

    async function getOutput() {

        const response = await fetch(`${API_BASE_URL}/strategies/functions/run`);
        const result = await response.json();

        // let output_result = []
        // if (result && result["output"] && result["output"].length > 0) {
        //     const symbol_timeFrame = result["output"][0];
        //     const metrics = result["output"][1]
        //     const formattedOutput = Object.entries(metrics)
        //         .map(([key, value]) => {
        //             if (typeof value === "number") {
        //                 if (key.includes("Rate") || key.includes("CAGR") || key.includes("Drawdown")) {
        //                     return `${key}: ${value.toFixed(2)}%`;
        //                 }
        //                 if (key.includes("Returns") || key.includes("Sharpe") || key.includes("Factor")) {
        //                     return `${key}: ${value}`;
        //                 }
        //                 if (key.toLowerCase().includes("profit") || key.toLowerCase().includes("loss") || key === "Net PnL") {
        //                     return `${key}: ₹${value.toFixed(2)}`;
        //                 }
        //             }
        //             return `${key}: ${value}`;
        //         })
        //         .join("\n");
        //     output_result.push(symbol_timeFrame)
        //     output_result.push(formattedOutput)
        setOutputMessage(result);
        console.log(outputMessage)
        // } else {
        //     setOutputMessage("Waiting for data to be Fetched or No backtest data found or input is missing.");
        // }
    }
    const handleTimeframeChange = (value) => {
        setSelectedTimeframes(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const clearAllTimeframes = () => {
        setSelectedTimeframes([]);
    };


    async function handleStartBacktest() {
        if (
            selectedStrategy.trim() === "" ||
            stockSymbol.trim() === "" ||
            period.trim() === "" ||
            selectedTimeframes.length === 0
        ) {
            alert("Please fill all the inputs.");
            return;
        }
        setLoading(true);
        // Add replace: true to ensure full replacement of previous input data
        const payload = {
            strategy: selectedStrategy,
            stocks: stockSymbol,
            period: period,
            timeframes: selectedTimeframes,
            replace: true
        };
        console.log({
            selectedStrategy,
            stockSymbol,
            period,
            selectedTimeframes
        });

        try {
            const response = await fetch(`${API_BASE_URL}/strategies/functions/input`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // const result = await response.json();

        } catch (error) {
            setOutputMessage("Error: " + error.message);
        }
        finally {
            setLoading(false)
            getOutput()


        }
    }

    return (
        <Wrapper>
            <Container>
                <Title>Backtest Your Strategies Like a Pro..</Title>
                <Label>Select Strategy</Label>
                <Select value={selectedStrategy} onChange={e => setSelectedStrategy(e.target.value)}>
                    <option value="">-- Select a strategy --</option>
                    {strategiesFunctions.map((ele, ind) => (
                        <option key={ind} value={ele}>{ele}</option>
                    ))}
                </Select>

                <Label>Enter Stocks</Label>
                <Input placeholder='Stocks Symbol' value={stockSymbol} onChange={e => setStockSymbol(e.target.value)} />

                <Label>Enter Period</Label>
                <Input placeholder='Stocks Period' value={period} onChange={e => setPeriod(e.target.value)} />

                <Label>Select Time Frame</Label>
                <CheckboxGroup>
                    {[
                        { value: "FIVE_MINUTE", label: "5 Minute" },
                        { value: "FIFTEEN_MINUTE", label: "15 Minute" },
                        { value: "THIRTY_MINUTE", label: "30 Minute" },
                        { value: "ONE_HOUR", label: "1 Hour" },
                        { value: "FOUR_HOUR", label: "4 Hour" },
                        { value: "ONE_DAY", label: "Day" }
                    ].map((tf, ind) => (
                        <CheckboxLabel key={ind}>
                            <input
                                type="checkbox"
                                value={tf.value}
                                checked={selectedTimeframes.includes(tf.value)}
                                onChange={() => handleTimeframeChange(tf.value)}
                            />
                            {tf.label}
                        </CheckboxLabel>
                    ))}
                </CheckboxGroup>
                <ClearAll onClick={clearAllTimeframes} style={{ marginBottom: '1rem' }}>Clear All</ClearAll>
                <Button onClick={handleStartBacktest} disabled={loading}>
                    {loading ? "Submitting..." : "Start Backtest"}
                </Button>
            </Container>

            <Output>
                <h1>OUTPUT</h1>
                <CardsContainer>
                {outputMessage && outputMessage["output"] && Array.isArray(outputMessage["output"]) && (
                    <>
                        {(() => {
                            const cards = [];
                            for (let i = 0; i < outputMessage["output"].length; i += 2) {
                                const header = outputMessage["output"][i];
                                
                                const data = outputMessage["output"][i + 1];
                                if (Array.isArray(header) && typeof data === "object" && data !== null) {
                                    cards.push(
                                        <Card key={i}>
                                            <Preformatted>
                                                {`${header.join("--")}\n-------------------------------------------\n${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')}`}
                                            </Preformatted>
                                        </Card>
                                    );
                                }
                            }
                            return cards;
                        })()}
                    </>
                )}
                </CardsContainer>
            </Output>
        </Wrapper>
    )
}

export default BacktestInputs