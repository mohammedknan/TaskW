import { StyleSheet } from "react-native";


export const inputSearchStyle = StyleSheet.create({
  background: {
    flexDirection: 'row',
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 10,
  },
  iconStyle: {
    fontSize: 24,
    color: "#007BFF",
    marginLeft: 10,
  },
});

export const searchStyle = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  txt: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  btn: {
    marginTop: 20,
  },
  cityList: {
    marginTop: 30,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 10,
  },
  cityItem: {
    fontSize: 18,
    paddingVertical: 8,
    color: "#444",
  },
  resultTitle: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
    color: "#000",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#333",
  },
  weatherInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  });



  export const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f8f8",
      },
      button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: "95%",
        alignItems: "center",
      },
      buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
      clearButton: {
        backgroundColor: "#FF4C4C",
      },
      item: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginVertical: 3,
        marginHorizontal: 80,
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      itemText: {
        fontSize: 16,
        color: "#333",
      },
      noDataText: {
        fontSize: 18,
        color: "#888",
        marginTop: 20,
      },
  });


  export const DetailsStyle  = StyleSheet.create({


        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#f4f4f4',
        },
        cityName: {
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 15,
            color: '#333',
        },
        card: {
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
            elevation: 3,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 2, height: 2 },
        },
        date: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5,
            color: '#007bff',
        },
        temp: {
            fontSize: 16,
            marginBottom: 3,
        },
        bold: {
            fontWeight: 'bold',
            color: '#e63946',
        },
        loading: {
            fontSize: 18,
            textAlign: 'center',
            marginTop: 20,
        },
        legend: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        legendItem: {
            width: 15,
            height: 15,
            marginHorizontal: 5,
        },
    });


export const DataDetails = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    date: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});



