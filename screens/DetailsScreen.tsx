import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { DetailsStyle , DataDetails } from '../styles/style';
import useResults1 from '../hooks/useResults1';
import { DetailsScreenProps } from '../types/type';

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
    const { term } = route.params;
    const searchTerm = term || 'Madaba';

    const { searchApi1, results1, errorMessage1 } = useResults1();
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        console.log('Fetching data for term:', searchTerm);
        searchApi1(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        console.log('Results1 updated:');
    }, [results1]);

    const toggleChart = () => {
        setShowChart(!showChart);
    };

    const filteredData = results1?.filter((item, index, self) => {
        const date: string = item.date.split(' ')[0];
        return self.findIndex((el) => el.date.split(' ')[0] === date) === index;
    })
        .slice(1, 6) || [];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    };

    return (
        <View style={DetailsStyle.container}>

            <Text style={{ alignSelf: 'center', fontSize: 25 }}>
                {`forecast ${searchTerm}`}
            </Text>

            {errorMessage1 ? (
                <Text style={DataDetails.error}>{errorMessage1}</Text>
            ) : results1 ? (
                <>
                    {showChart && (
                        <View>
                            <LineChart
                                data={{
                                    labels: filteredData.map((item) => formatDate(item.date.split(' ')[0])),
                                    datasets: [
                                        {
                                            data: filteredData.map((item) => item.temp_max),
                                            color: () => '#FF5733',
                                            strokeWidth: 2,
                                        },
                                        {
                                            data: filteredData.map((item) => item.temp_min),
                                            color: () => '#3498DB',
                                            strokeWidth: 2,
                                        },
                                    ],
                                }}
                                width={350}
                                height={220}
                                yAxisSuffix="°C"
                                chartConfig={{
                                    backgroundGradientFrom: '#f5f5f5',
                                    backgroundGradientTo: '#fff',
                                    decimalPlaces: 1,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: { borderRadius: 16 },
                                    propsForDots: {
                                        r: '5',
                                        strokeWidth: '2',
                                        stroke: '#ffa726',
                                    },
                                }}
                                bezier
                                style={{ marginVertical: 8, borderRadius: 16 }}
                            />
                        </View>
                    )}

                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.date}
                        renderItem={({ item }) => (
                            <View style={DataDetails.card}>
                                <Text style={DataDetails.date}>{formatDate(item.date)}</Text>
                                <Text>🔼 Temp: {item.temp}°C</Text>
                                <Text>🔽 Min: {item.temp_min}°C | Max: {item.temp_max}°C</Text>
                            </View>

                        )}
                    />

                    <Button title={showChart ? 'Hide Chart' : 'Show Chart'} onPress={toggleChart} />
                </>
            ) : (
                <Text style={DetailsStyle.loading}>Loading data...</Text>
            )}
        </View>
    );
};



export default DetailsScreen;
