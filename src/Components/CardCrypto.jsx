import '../Styles/CardCrypto.css'
import { datesCryptos } from '../Helpers/FetchApiCrypto';
import { useState, useEffect } from 'react';
import CryptoChart from './CryptoChart';
import lens from '../Media/LensImg.png'
import CryptoContainer from './CryptoContainer';
import { fetchCryptoSearch } from '../Helpers/FetchCryptoSearch';

const CardCrypto = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await datesCryptos();
                setCryptoData(data);
                setSelectedCrypto(data[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchCrypto = async () => {
            try {
                if (searchValue !== '') {
                    const dataSearch = await fetchCryptoSearch(searchValue, cryptoData);
                    setSearchResults(dataSearch);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCrypto();
    }, [searchValue, cryptoData]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleCryptoClick = (crypto) => {
        setSelectedCrypto(crypto)
    };

    const formatNumber = (number) => {
        const formattedNumber = Number(number).toFixed(2);
        return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace('.', ',');
    };

    return (
        <div className="containerCards">
            <div className="containerGraph">
                <div className='titleGraph'>
                    <h1>Sales Activity</h1>
                    <p>
                        Here you can compare sales channel to determine the most effective<br />
                        channels and develop a sales satrategy based on this data.
                    </p>
                    <div>
                        <div className='nameCrypto'>
                            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>
                                {selectedCrypto?.name}
                            </h1>
                        </div>
                        <div className='priceCrypto'>
                            <p style={{ color: 'white', fontSize: '50px' }}>
                                ${formatNumber(selectedCrypto?.current_price)}
                            </p>
                        </div>
                    </div>
                </div>
                <div><CryptoChart selectedCrypto={selectedCrypto} /></div>
            </div>
            <div className="containerPanel">
                <div className="containerTitle">
                    <p style={{ fontSize: '130%' }}>Control panel</p>
                    <div className='search'>
                        <input placeholder="Enter your search request..." value={searchValue} onChange={handleSearchChange} />
                        <img src={lens} />
                    </div>
                    <div className='titleCrypto'>
                        <h1 style={{ fontSize: '80%' }}>B2B DISTRIBUTION</h1>
                        <p style={{ fontSize: '70%' }}>Sales Deals</p>
                    </div>
                </div>
                <div>
                    <hr className="horizontalLine" />
                </div>
                <div className="containerCryptos">
                    <CryptoContainer
                        cryptoData={searchValue !== '' ? searchResults : cryptoData}
                        formatNumber={formatNumber}
                        onClick={(crypto) => handleCryptoClick(crypto)} />
                </div>
            </div>
        </div>
    );
};

export default CardCrypto;