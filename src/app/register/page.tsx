"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { Col, Form, Row, Button } from 'react-bootstrap';
import "../login/page.scss";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/navigation';


const Page = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      const apiUrl = 'http://localhost:8081/auth/register';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const responseData = await response.json();
          toast.success('Account aanmaken gelukt!');
          router.push('/login');
        } else {
          const responseBody = await response.text();
          console.warn('Geen json response:', responseBody);
        }
      } else {
        const responseBody = await response.text();
        toast.error('Account aanmaken mislukt');
      }
    } catch (error) {
      toast.error('Account aanmaken mislukt');
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-4">
          <div className={"container__home d-flex justify-content-center dm-sans"}>
            <p className={"title__home text-center justify-content-md-center align-middle"}>Login</p>
          </div>
          <div className={"d-flex justify-content-center"}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label className={"label__text"}>Username</Form.Label>
                <Form.Control
                  className={"input__home"}
                  type="username"
                  {...register("username", { required: true })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className={"label__text"}>Email address</Form.Label>
                <Form.Control
                  className={"input__home"}
                  type="email"
                  {...register("email", { required: true })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className={"label__text"}>Password</Form.Label>
                <Form.Control
                  className={"input__home"}
                  type="password"
                  {...register("password", { required: true })}
                />
              </Form.Group>
              <Row>
                <Col className={"text__form"}><a href="../login/">Al een account?</a></Col>
                <Col className={"text__form"}>Wachtwoord Vergeten</Col>
              </Row>
              <Button type="submit" variant={"dark"} className={"button__submit"}>
                Maak account aan
              </Button>
            </Form>
          </div>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
        <div className="col-8">
          <div className="row">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                 width="560.00000pt" height="575.00000pt" viewBox="0 0 560.000000 575.000000"
                 preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,575.000000) scale(0.100000,-0.100000)"
                 fill="#000000" stroke="none">
                <path d="M2704 5659 c-45 -29 -321 -197 -989 -604 -485 -295 -650 -397 -667
-413 -17 -14 -18 -54 -18 -573 0 -542 1 -559 19 -569 27 -14 900 -14 938 1 15
5 31 16 35 22 4 7 8 53 8 104 0 84 -2 93 -22 107 -19 14 -72 16 -370 16 l-348
0 0 110 0 110 214 0 c186 0 215 2 220 16 3 9 6 66 6 127 l0 112 33 22 c17 12
154 95 302 184 149 90 369 222 490 295 l220 133 30 -18 c16 -10 163 -97 325
-193 162 -97 385 -229 495 -294 l200 -119 3 -242 2 -243 -155 0 c-195 0 -195
0 -195 -124 0 -126 -1 -125 190 -128 l155 -3 3 -287 2 -286 -137 -78 c-76 -43
-196 -112 -268 -154 -71 -42 -191 -112 -265 -155 -74 -43 -191 -112 -259 -154
l-125 -75 -45 25 c-46 25 -393 229 -786 461 l-210 125 -3 61 -3 62 131 0 c167
0 170 2 170 128 0 48 -4 92 -8 98 -21 32 -53 34 -506 34 -400 0 -456 -2 -470
-16 -14 -14 -16 -69 -16 -457 l0 -442 328 -195 c180 -107 471 -279 647 -384
176 -104 347 -206 380 -226 109 -68 384 -230 390 -230 8 0 320 180 560 324
121 73 276 165 345 206 69 40 204 120 300 178 96 58 261 156 365 218 l190 112
3 1120 2 1120 -87 55 c-49 30 -241 147 -428 259 -187 113 -468 283 -625 378
-515 312 -613 370 -630 370 -9 0 -38 -14 -66 -31z m532 -555 c463 -279 692
-416 884 -529 58 -34 115 -68 128 -76 l22 -14 0 -462 0 -463 -90 0 -90 0 0
413 0 412 -522 313 c-288 172 -581 349 -653 392 -71 44 -134 79 -139 80 -4 0
-85 -47 -180 -104 -791 -479 -1099 -666 -1112 -676 -10 -9 -14 -35 -14 -91 l0
-79 -90 0 -90 0 0 130 0 130 53 34 c28 19 189 117 357 219 168 101 476 288
685 415 209 127 383 231 386 231 3 1 212 -123 465 -275z m1034 -1864 l0 -80
-90 0 -90 0 0 80 0 80 90 0 90 0 0 -80z m-2800 -334 l0 -146 38 -19 c21 -11
225 -129 453 -262 228 -133 482 -281 564 -329 83 -48 169 -99 190 -113 22 -15
45 -27 52 -27 7 0 153 82 325 182 172 100 466 270 653 377 l340 196 3 73 3 72
89 0 90 0 0 -184 0 -184 -47 -30 c-27 -16 -160 -96 -298 -177 -137 -81 -449
-267 -693 -412 -271 -162 -450 -263 -461 -260 -17 4 -781 457 -1248 740 l-233
141 0 246 c0 136 2 249 5 252 3 3 44 6 90 7 l85 2 0 -145z"/>
                <path d="M2704 4601 c-21 -13 -38 -36 -49 -66 -18 -45 -18 -48 1 -92 25 -60
63 -88 118 -87 75 2 126 55 126 131 0 50 -18 82 -59 110 -42 28 -95 30 -137 4z"/>
                <path d="M2232 4148 c-17 -17 -17 -1329 0 -1346 16 -16 480 -17 509 -2 17 9
19 22 19 98 0 55 -4 92 -12 100 -8 8 -58 12 -159 12 l-146 0 -6 83 c-4 45 -7
301 -7 568 0 435 -2 488 -16 493 -29 11 -169 7 -182 -6z"/>
                <path d="M2656 4147 c-21 -15 -33 48 134 -712 49 -220 98 -449 110 -510 12
-60 27 -116 32 -122 13 -16 151 -18 178 -3 11 6 21 26 25 52 4 24 20 102 36
173 15 72 49 225 74 340 25 116 54 248 65 295 69 298 101 471 90 486 -16 18
-178 20 -203 2 -12 -9 -25 -59 -46 -175 -60 -333 -125 -645 -132 -626 -4 10
-41 193 -83 407 -44 227 -81 393 -88 398 -22 13 -172 9 -192 -5z"/>
                <path d="M2744 2526 c-11 -29 1 -81 19 -84 14 -3 17 4 17 47 0 39 -4 51 -15
51 -9 0 -18 -6 -21 -14z"/>
                <path d="M2190 1055 c-76 -24 -140 -102 -140 -172 0 -42 38 -110 74 -133 18
-11 66 -27 107 -36 103 -23 131 -51 89 -89 -31 -28 -117 -17 -167 23 l-40 31
-41 -42 c-23 -24 -42 -48 -42 -55 0 -15 91 -74 139 -90 48 -17 145 -15 189 4
43 18 88 58 108 96 21 40 18 117 -6 156 -27 45 -68 67 -171 92 -93 23 -112 39
-83 71 24 27 80 24 133 -7 l44 -25 44 43 c48 47 51 55 26 75 -77 60 -183 84
-263 58z"/>
                <path d="M3400 1055 c-217 -72 -277 -343 -111 -498 67 -62 121 -81 224 -75 91
5 145 28 199 85 72 76 96 225 51 324 -61 136 -224 210 -363 164z m131 -135
c42 -12 82 -51 104 -103 43 -104 -75 -231 -185 -198 -20 6 -51 26 -69 45 -62
64 -53 186 17 232 48 32 83 38 133 24z"/>
                <path d="M525 1047 c-3 -7 -4 -134 -3 -282 l3 -270 203 -3 202 -2 0 70 0 70
-130 0 -130 0 0 215 0 215 -70 0 c-48 0 -72 -4 -75 -13z"/>
                <path d="M1000 1056 c0 -6 185 -462 210 -518 l21 -48 72 0 72 0 57 143 c102
255 158 403 158 415 0 8 -23 12 -73 12 l-72 0 -59 -157 c-33 -87 -66 -173 -73
-192 l-15 -35 -37 100 c-21 54 -52 141 -70 192 l-33 92 -79 0 c-44 0 -79 -2
-79 -4z"/>
                <path d="M2610 990 l0 -70 83 0 82 0 0 -212 0 -213 67 -3 68 -3 2 213 3 213
80 5 80 5 3 68 3 67 -236 0 -235 0 0 -70z"/>
                <path d="M3975 1048 c-3 -7 -4 -135 -3 -283 l3 -270 67 -3 67 -3 3 78 3 78 45
3 45 2 48 -80 49 -80 74 0 c41 0 74 4 74 9 0 5 -22 47 -49 93 l-49 83 35 29
c67 56 82 149 39 243 -19 39 -35 58 -73 80 -47 27 -53 28 -210 31 -130 3 -164
1 -168 -10z m306 -157 c35 -36 36 -54 4 -86 -21 -22 -33 -25 -100 -25 l-75 0
0 70 0 70 71 0 c65 0 73 -2 100 -29z"/>
                <path d="M4647 1054 c-11 -11 -8 -549 2 -560 6 -5 95 -8 215 -6 l206 3 0 69 0
70 -145 0 -145 0 0 35 0 34 118 3 117 3 3 62 3 62 -118 3 -118 3 0 40 0 40
138 3 138 3 -3 67 -3 67 -201 3 c-110 1 -203 -1 -207 -4z"/>
                <path d="M1705 615 c-67 -67 20 -171 105 -125 28 15 40 61 25 97 -24 57 -88
71 -130 28z"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
