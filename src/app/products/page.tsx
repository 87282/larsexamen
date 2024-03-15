"use client"

import React, {useEffect, useState} from 'react';
import "./page.scss";
import {toast, ToastContainer} from "react-toastify";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/navigation";


interface UserData {
    role: string;
    _id: number;
    username: string;
    email: string;
}

interface ProductData {
    _id: number;
    naam: string;
    prijs: number;
    categorie: string;
    beschrijving: string;
    "__v": number;
    "aantal": number;
}

const Page = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const canViewPage = userData && userData.role === "admin";
    const [data, setData] = useState<UserData[]>([]);
    const [isLoggedIn , setLoggedIn] = useState(true);
    const router = useRouter();
    const [productData, setProductData] = useState<ProductData[]>([]);
    const [cartItems, setCartItems] = useState<ProductData[]>([]);


    useEffect(() => {
        if(!cookieCutter.get('LARS-AUTH')){
            window.location.href = '/login';
        }

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8081/users', {credentials: "include"});
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8081/me', {credentials: "include"});
                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };





        fetchUserData();
        fetchData();
    }, []);

    useEffect(() => {
        if (userData && userData._id) {
            const fetchCartData = async () => {
                try {
                    const response = await fetch(`http://localhost:8081/cart/${userData._id}`, {credentials: "include"});
                    useEffect(() => {
                        if (userData && userData._id) {
                            const fetchCartData = async () => {
                                try {
                                    const response = await fetch(`http://localhost:8081/cart/${userData._id}`, {credentials: "include"});
                                    if (!response.ok) {
                                        throw new Error('Failed to fetch cart data');
                                    }
                                    const cartData = await response.json();
                                    setCartItems(cartData.items || []);

                                } catch (error) {
                                    console.error('Error fetching cart data:', error);
                                }
                            };

                            fetchCartData();
                        }
                    }, [userData]);
                    if (!response.ok) {
                        throw new Error('Failed to fetch cart data');
                    }
                    const cartData = await response.json();
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                }
            };

            fetchCartData();
        }
    }, [userData]);

    const handleLoginClick = () => {
        router.push('/login');
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    const addToCart = async (product: ProductData) => {
        const userId = userData?._id;

        try {
            const response = await fetch('http://localhost:8081/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productId: product._id,
                    aantal: 1,
                    naam: product.naam,
                    prijs: product.prijs
                }),
                credentials: 'include',
            });

            if (response.ok) {
                toast.success(`${product.naam} is toegevoegd aan de winkelwagen!`);
                const updatedCartResponse = await fetch(`http://localhost:8081/cart/${userId}`, { credentials: "include" });
                const updatedCartData = await updatedCartResponse.json();
                setCartItems(updatedCartData.items || []);
            } else {
                toast.error('Fout bij het toevoegen aan de winkelwagen. Probeer het opnieuw.');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Fout bij het communiceren met de server.');
        }
    };


    const fetchProductData = async () => {
        try {
            const response = await fetch('http://localhost:8081/getProducten', {credentials: "include"});
            const productData = await response.json();
            setProductData(productData);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const calculateSize = () => {
        let size = 0;
        cartItems.forEach((item) => {
            size += item.aantal;
        });
        return size;
    }



    const handleLogout = () => {
        cookieCutter.set('LARS-AUTH', '', { expires: new Date(0) });

        setLoggedIn(false);
        toast.success('U bent uitgelogd');
        router.push('/login');
    };

    return (
        <>
            <div className={"container-fluid bg-light"}>
                <div className="row row__admin shadow-sm sticky-top">
                    <div className="col-6">
                        <p className={"text__nav"}>Welkom, {userData ? userData.username : 'Loading...'}</p>
                    </div>
                    <div className="col-6">
                        {canViewPage ?
                            (
                                <button className="btn btn-primary text-end float-end ml-3" onClick={() => {
                                    router.push('/admin')
                                }}>
                                    Admin Portal
                                </button>
                            ):(
                                ""
                        )}
                        {isLoggedIn ? (
                            <>
                                <div className="cart-icon">
                                    <svg onClick={() => {
                                        router.push('/cart')

                                    }}
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart3 cursor-pointer" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 3.607 0.61 2H0v-.5ZM3.102 4l1.313 7h8.17l1.313-7H3.102Z"/>
                                        <path d="M11 14a2 2 0 1 1-4 0 a2 2 0 0 1 4 0ZM3 14a2 2 0 1 1-4 0 a2 2 0 0 1 4 0Z"/>
                                    </svg>
                                    <span className="cart-count">{calculateSize()}</span>
                                </div>

                                <button className="btn btn-primary text-end float-end" onClick={handleLogout}>
                                Uitloggen
                            </button>
                            </>
                        ) : (
                            <p className="text-end text__nav" onClick={handleLoginClick}>
                                Login
                            </p>
                        )}
                    </div>
                </div>
                {isLoggedIn ? (

                    <div className="row pt-4">
                        {productData.map((product, index) => (
                            <div className="col-md-4 mb-4" key={product._id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.naam}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{product.categorie}</h6>
                                        <p className="card-text">{product.beschrijving}</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">Prijs: €{product.prijs}</small>
                                        <button className="btn btn-primary float-right float-end" onClick={() => addToCart(product)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                ) : (
                    ""   )}
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} />

        </>

    );
};

export default Page;