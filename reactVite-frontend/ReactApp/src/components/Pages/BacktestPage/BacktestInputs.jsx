import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components';

const API_BASE_URL = import.meta.env.VITE_API_KEY;


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;
  padding: 0.2rem;
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
  min-height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
`;

const ResizableDivider = styled.div`
  width: 5px;
  cursor: col-resize;
  background-color: #555;
  height: 100%;
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
  font-family: 'Segoe UI', sans-serif;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: gray;
  font-family: 'Segoe UI', sans-serif;
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap:20px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: silver;
  cursor: pointer;

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
  flex-direction: column;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: auto;
`;

const ScrollableTimeframes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 1rem;
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
  width: 100%;
  &:hover {
    background: #555;
  }
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

function BacktestInputs() {
    let [strategiesFunctions, setStrategiesFunctions] = useState([]);
    const [selectedTimeframes, setSelectedTimeframes] = useState([]);
    const [stockSymbol, setStockSymbol] = useState('');

    const [selectedStrategy, setSelectedStrategy] = useState('');
    const [loading, setLoading] = useState(false);
    const [outputMessage, setOutputMessage] = useState('');
    const [strategyArgs, setStrategyArgs] = useState({});

    const [startingDate,setStartingDate] = useState("");
    const [endingDate,setEndingDate] = useState("")

    const [containerWidth, setContainerWidth] = useState(40); // percent
    const startDragging = (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const initialWidth = containerWidth;

      const onMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const wrapperWidth = document.body.clientWidth;
        const newWidth = ((initialWidth / 100) * wrapperWidth + deltaX) / wrapperWidth * 100;
        setContainerWidth(Math.min(80, Math.max(20, newWidth)));
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    useEffect(() => {
        async function getStrategiesFunctions() {
            try {
                const response = await fetch(`${API_BASE_URL}/strategies/functions`);
                const result = await response.json();
                console.log("API Response:", result);

                if (Array.isArray(result)) {
                    setStrategiesFunctions(result);
                    if (result.length > 0) {
                        setSelectedStrategy(result[0].name);
                    }
                } else {
                    console.error("Expected array but got:", typeof result);
                    setStrategiesFunctions([]); // fallback to prevent crash
                }
            } catch (err) {
                console.error("Error fetching strategies:", err);
                setStrategiesFunctions([]);
            }
        }

        getStrategiesFunctions();
    }, []);

    useEffect(() => {
        const selected = strategiesFunctions.find(s => s.name === selectedStrategy);
        if (selected) {
            const newArgs = {};
            selected.args.forEach(arg => newArgs[arg] = "");
            setStrategyArgs(newArgs);
        } else {
            setStrategyArgs({});
        }
    }, [selectedStrategy, strategiesFunctions]);

    async function getOutput() {

        const response = await fetch(`${API_BASE_URL}/strategies/functions/run`);
        const result = await response.json();

        setOutputMessage(result);
        console.log(outputMessage)
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
            selectedTimeframes.length === 0 ||
            startingDate.length ===0 ||
            Object.values(strategyArgs).some(val => val.trim() === "")
        ) {
            alert("Please fill all the inputs.");
            return;
        }
        setLoading(true);
        // Pass strategyArgs as-is, preserving user input (e.g., "21 41 51" stays as string)
        const payload = {
            strategy: selectedStrategy,
            strategy_args: strategyArgs,
            stocks: stockSymbol,
            timeframes: selectedTimeframes,
            startingDate: startingDate,
            endingDate: endingDate,
            replace: true
        };
        console.log({
            selectedStrategy,
            stockSymbol,
            selectedTimeframes,
            strategyArgs
        });
        try {
            const response = await fetch(`${API_BASE_URL}/strategies/functions/input`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
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
            <Container style={{ flexBasis: `${containerWidth}%` }}>
                <Title>Backtest Your Strategies Like a Pro..</Title>
                <FormSection>
                  <Label>Select Strategy</Label>
                  <Select value={selectedStrategy} onChange={e => setSelectedStrategy(e.target.value)}>
                      <option value="">-- Select a strategy --</option>
                      {Array.isArray(strategiesFunctions) && strategiesFunctions.map((ele, ind) => (
                          <option key={ind} value={ele.name}>{ele.name}</option>
                      ))}
                  </Select>
                </FormSection>

                {Object.entries(strategyArgs).map(([argName, value], index) => (
                    <FormSection key={index}>
                        <Label>{argName}</Label>
                        <Input
                            placeholder={`Enter value for ${argName}`}
                            value={strategyArgs[argName]}
                            onChange={e => setStrategyArgs(prev => ({ ...prev, [argName]: e.target.value }))}
                        />
                    </FormSection>
                ))}

                <FormSection>
                  <Label>Enter Stocks</Label>
                  <Input placeholder='Stocks Symbol' value={stockSymbol} onChange={e => setStockSymbol(e.target.value)} />
                </FormSection>

                <FormSection>
                  <Label>Enter Starting Date</Label>
                  <Input placeholder='Enter Starting Date' value={startingDate} onChange={e => setStartingDate(e.target.value)} type = "date"/>
                </FormSection>
                
                <FormSection>
                  <Label>Enter Ending Date</Label>
                  <Input placeholder='Enter Ending Date' value={endingDate} onChange={e => setEndingDate(e.target.value)} type = "date"/>
                </FormSection>
                
               
                <FormSection>
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
                </FormSection>

                <FormSection>
                  <Button onClick={handleStartBacktest} disabled={loading}>
                      {loading ? "Submitting..." : "Start Backtest"}
                  </Button>
                </FormSection>
            </Container>
            <ResizableDivider onMouseDown={startDragging} />
            <Output style={{ flexBasis: `${100 - containerWidth}%` }}>
                
                <CardsContainer>
                  {outputMessage && Array.isArray(outputMessage["output"]) && (
                    <>
                      {Object.entries(outputMessage["output"].reduce((acc, curr) => {
                        const symbol = Object.keys(curr)[0];
                        const timeframes = curr[symbol];
                        if (!acc[symbol]) acc[symbol] = {};
                        Object.entries(timeframes).forEach(([tf, data]) => {
                          acc[symbol][tf] = data;
                        });
                        return acc;
                      }, {})).map(([stockSymbol, timeframes]) => (
                        <div key={stockSymbol} style={{ width: '100%' }}>
                          <h2 style={{ width: '100%', fontWeight: 'bold', fontSize: '1.5rem' }}>{stockSymbol}</h2>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {Object.entries(timeframes).map(([timeframe, results], tfIndex) => {
                              if (!Array.isArray(results) || results.length === 0) return null;
                              return (
                                <div key={timeframe} style={{ width: '100%' }}>
                                  <h3 style={{ fontWeight: 'normal' }}>{timeframe}</h3>
                                  <ScrollableTimeframes>
                                    {results.map((resultSet, idx) => {
                                      const entryKey = Object.keys(resultSet)[0];
                                      const entryValues = resultSet[entryKey];
                                      return (
                                        <Card key={`${timeframe}_${entryKey}_${idx}`}>
                                          <Preformatted>
                                            <strong>{entryKey}</strong>{"\n"}
                                            -----------------------------{"\n"}
                                            {Object.entries(entryValues).map(([k, v]) => `${k}: ${v}`).join('\n')}
                                          </Preformatted>
                                        </Card>
                                      );
                                    })}
                                  </ScrollableTimeframes>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </CardsContainer>
            </Output>
        </Wrapper>
    )
}

export default BacktestInputs