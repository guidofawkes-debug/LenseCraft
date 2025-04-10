--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    session_id text NOT NULL,
    product_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    image_url text,
    product_count integer DEFAULT 0
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price real NOT NULL,
    brand text NOT NULL,
    image_url text NOT NULL,
    category text NOT NULL,
    compatible_vehicles jsonb NOT NULL,
    featured boolean DEFAULT false,
    stock_quantity integer NOT NULL,
    tags jsonb DEFAULT '[]'::jsonb,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vehicle_makes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vehicle_makes (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: vehicle_makes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vehicle_makes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vehicle_makes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vehicle_makes_id_seq OWNED BY public.vehicle_makes.id;


--
-- Name: vehicle_models; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vehicle_models (
    id integer NOT NULL,
    make_id integer NOT NULL,
    name text NOT NULL,
    year_start integer,
    year_end integer
);


--
-- Name: vehicle_models_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vehicle_models_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vehicle_models_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vehicle_models_id_seq OWNED BY public.vehicle_models.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vehicle_makes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vehicle_makes ALTER COLUMN id SET DEFAULT nextval('public.vehicle_makes_id_seq'::regclass);


--
-- Name: vehicle_models id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vehicle_models ALTER COLUMN id SET DEFAULT nextval('public.vehicle_models_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart_items (id, session_id, product_id, quantity, created_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name, description, image_url, product_count) FROM stdin;
1	Headlights	LED and HID headlight assemblies	https://images.unsplash.com/photo-1558562720-1297f0183887?auto=format&fit=crop&q=80	24
2	Tail Lights	LED and standard tail light assemblies	https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80	19
3	Signal Lights	Turn signal light assemblies	https://images.unsplash.com/photo-1501061987532-3a20cdbd5ebd?auto=format&fit=crop&q=80	12
4	Fog Lights	Fog and driving light kits	https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?auto=format&fit=crop&q=80	8
46	Headlights	LED and HID headlight assemblies	https://images.unsplash.com/photo-1558562720-1297f0183887?auto=format&fit=crop&q=80	24
47	Tail Lights	LED and standard tail light assemblies	https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80	19
48	Signal Lights	Turn signal light assemblies	https://images.unsplash.com/photo-1501061987532-3a20cdbd5ebd?auto=format&fit=crop&q=80	12
49	Fog Lights	Fog and driving light kits	https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?auto=format&fit=crop&q=80	8
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, name, description, price, brand, image_url, category, compatible_vehicles, featured, stock_quantity, tags, created_at) FROM stdin;
59	LED Headlight Assembly	High-performance LED headlight assembly for Toyota Corolla. Provides better visibility and a modern look.	299.99	DEPO	https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80	Headlights	["Toyota Corolla 2018-2022"]	t	15	["LED", "Toyota", "Headlights", "New Arrival"]	2025-04-09 13:53:35.088215
63	LED DRL Kit	Daytime running light kit with automatic on/off function. Easy installation.	149.99	LUCID	https://images.unsplash.com/photo-1542683205-2da0c3bf235e?auto=format&fit=crop&q=80	Headlights	["Toyota Camry 2018-2023", "Honda Accord 2018-2023"]	f	7	["LED", "DRL", "Universal"]	2025-04-09 13:53:35.174826
64	HID Conversion Kit	HID conversion kit with all necessary components for installation. 6000K white light.	189.99	TYC	https://images.unsplash.com/photo-1527247162509-cf96942232c1?auto=format&fit=crop&q=80	Headlights	["Multiple vehicles"]	f	9	["HID", "Conversion", "Universal"]	2025-04-09 13:53:35.193651
66	Premium Tail Light Set	Complete tail light set for Honda Civic. LED elements for enhanced visibility and modern styling.	249.99	TYC	https://images.unsplash.com/photo-1560294559-1774a164fb0a?auto=format&fit=crop&q=80	Tail Lights	["Honda Civic 2016-2021"]	t	8	["LED", "Honda", "Tail Lights", "Best Seller"]	2025-04-10 06:44:06.373969
67	LED Fog Light Kit	Complete fog light kit for Mazda 3. LED bulbs for maximum visibility in adverse weather conditions.	199.99	LUCID	https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80	Fog Lights	["Mazda 3 2019-2023"]	t	3	["LED", "Mazda", "Fog Lights", "Limited Stock"]	2025-04-10 06:44:06.39054
68	Signal Light Assembly	Front signal light assembly for Subaru Forester. OEM quality replacement.	129.99	DEPO	https://images.unsplash.com/photo-1500463959177-e0869687df26?auto=format&fit=crop&q=80	Signal Lights	["Subaru Forester 2017-2020"]	t	12	["LED", "Subaru", "Signal Lights", "Sale"]	2025-04-10 06:44:06.407243
71	LED Headlight Assembly	High-performance LED headlight assembly for Toyota Corolla. Provides better visibility and a modern look.	299.99	DEPO	https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80	Headlights	["Toyota Corolla 2018-2022"]	t	15	["LED", "Toyota", "Headlights", "New Arrival"]	2025-04-10 07:02:09.283107
72	Premium Tail Light Set	Complete tail light set for Honda Civic. LED elements for enhanced visibility and modern styling.	249.99	TYC	https://images.unsplash.com/photo-1560294559-1774a164fb0a?auto=format&fit=crop&q=80	Tail Lights	["Honda Civic 2016-2021"]	t	8	["LED", "Honda", "Tail Lights", "Best Seller"]	2025-04-10 07:02:09.303454
73	LED Fog Light Kit	Complete fog light kit for Mazda 3. LED bulbs for maximum visibility in adverse weather conditions.	199.99	LUCID	https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80	Fog Lights	["Mazda 3 2019-2023"]	t	3	["LED", "Mazda", "Fog Lights", "Limited Stock"]	2025-04-10 07:02:09.319963
74	Signal Light Assembly	Front signal light assembly for Subaru Forester. OEM quality replacement.	129.99	DEPO	https://images.unsplash.com/photo-1500463959177-e0869687df26?auto=format&fit=crop&q=80	Signal Lights	["Subaru Forester 2017-2020"]	t	12	["LED", "Subaru", "Signal Lights", "Sale"]	2025-04-10 07:02:09.33568
75	LED DRL Kit	Daytime running light kit with automatic on/off function. Easy installation.	149.99	LUCID	https://images.unsplash.com/photo-1542683205-2da0c3bf235e?auto=format&fit=crop&q=80	Headlights	["Toyota Camry 2018-2023", "Honda Accord 2018-2023"]	f	7	["LED", "DRL", "Universal"]	2025-04-10 07:02:09.350761
1	Toyota Corolla LED Headlights	Direct replacement LED headlight assembly for Toyota Corolla with modern design and improved visibility.	299.99	DEPO	https://images.unsplash.com/photo-1580273707978-be653d042072?auto=format&fit=crop&q=80	Headlights	["Toyota Corolla 2018-2022"]	t	15	["LED", "Toyota", "Headlights", "New Arrival"]	2025-04-09 07:23:08.291827
2	Honda Civic LED Tail Lights	Custom LED tail light set for Honda Civic with sequential turn signals and modern styling.	249.99	TYC	https://images.unsplash.com/photo-1590543771922-473212fff7e8?auto=format&fit=crop&q=80	Tail Lights	["Honda Civic 2016-2021"]	t	8	["LED", "Honda", "Tail Lights", "Best Seller"]	2025-04-09 07:23:08.313238
3	Subaru Universal LED Fog Lights	Universal LED fog light kit for Subaru vehicles with bright white output and weather-resistant housing.	199.99	LUCID	https://images.unsplash.com/photo-1543966888-7c1dc482a810?auto=format&fit=crop&q=80	Fog Lights	["Mazda 3 2019-2023"]	t	3	["LED", "Mazda", "Fog Lights", "Limited Stock"]	2025-04-09 07:23:08.33288
4	Nissan LED Side Markers	Replacement LED side marker lights for Nissan vehicles with amber turn signal function.	129.99	DEPO	https://images.unsplash.com/photo-1575569664165-4c9d0cca5910?auto=format&fit=crop&q=80	Signal Lights	["Subaru Forester 2017-2020"]	t	12	["LED", "Subaru", "Signal Lights", "Sale"]	2025-04-09 07:23:08.352499
5	Universal Daytime Running Lights	Universal LED daytime running lights that can be installed on any Japanese vehicle for improved visibility.	149.99	LUCID	https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80	Headlights	["Toyota Camry 2018-2023", "Honda Accord 2018-2023"]	t	7	["LED", "DRL", "Universal"]	2025-04-09 07:23:08.372116
6	Premium HID Conversion System	Complete HID conversion system for upgrading standard halogen headlights to xenon HID with higher output.	189.99	TYC	https://images.unsplash.com/photo-1551830820-330a71ba4aab?auto=format&fit=crop&q=80	Headlights	["Multiple vehicles"]	t	9	["HID", "Conversion", "Universal"]	2025-04-09 07:23:08.391942
76	HID Conversion Kit	HID conversion kit with all necessary components for installation. 6000K white light.	189.99	TYC	https://images.unsplash.com/photo-1527247162509-cf96942232c1?auto=format&fit=crop&q=80	Headlights	["Multiple vehicles"]	f	9	["HID", "Conversion", "Universal"]	2025-04-10 07:02:09.366189
55	Mitsubishi LED Light Bar	High-output LED light bar for Mitsubishi vehicles with off-road capability and water-resistant design.	149.99	PIAA	https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80	Fog Lights	["Mitsubishi Lancer", "Mitsubishi Outlander"]	t	15	[]	2025-04-09 13:04:01.674734
56	Toyota Projector Headlights	High-quality projector headlights for Toyota models with focused beam pattern and modern black housing.	249.99	DEPO	https://images.unsplash.com/photo-1553949333-0510da388b82?auto=format&fit=crop&q=80	Headlights	["Toyota Camry", "Toyota Corolla"]	t	8	[]	2025-04-09 13:04:01.674734
57	Honda LED Interior Lighting Kit	Complete LED interior lighting kit for Honda vehicles with blue accent lighting and easy installation.	39.99	JDM	https://images.unsplash.com/photo-1619160970897-17b8d45f437f?auto=format&fit=crop&q=80	Interior Lights	["Honda Civic", "Honda Accord", "Honda CR-V"]	t	30	[]	2025-04-09 13:04:01.674734
58	Nissan Sequential Turn Signals	Dynamic sequential turn signal lights for Nissan vehicles with modern styling and plug-and-play installation.	89.99	TYC	https://images.unsplash.com/photo-1506610654-064fbba4780c?auto=format&fit=crop&q=80	Signal Lights	["Nissan 350Z", "Nissan 370Z", "Nissan GT-R"]	t	12	[]	2025-04-09 13:04:01.674734
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, password) FROM stdin;
\.


--
-- Data for Name: vehicle_makes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vehicle_makes (id, name) FROM stdin;
1	Toyota
2	Honda
3	Mazda
4	Subaru
5	Nissan
6	Mitsubishi
67	Toyota
68	Honda
69	Mazda
70	Subaru
71	Nissan
72	Mitsubishi
\.


--
-- Data for Name: vehicle_models; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vehicle_models (id, make_id, name, year_start, year_end) FROM stdin;
1	1	Corolla	2018	2022
2	1	Camry	2018	2023
3	1	RAV4	2019	2023
4	2	Civic	2016	2021
5	2	Accord	2018	2023
6	2	CR-V	2017	2022
7	3	Mazda 3	2019	2023
8	3	CX-5	2017	2023
9	4	Forester	2017	2020
10	4	Impreza	2017	2021
111	1	Corolla	2018	2022
112	1	Camry	2018	2023
113	1	RAV4	2019	2023
114	2	Civic	2016	2021
115	2	Accord	2018	2023
116	2	CR-V	2017	2022
117	3	Mazda 3	2019	2023
118	3	CX-5	2017	2023
119	4	Forester	2017	2020
120	4	Impreza	2017	2021
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 49, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 76, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: vehicle_makes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vehicle_makes_id_seq', 72, true);


--
-- Name: vehicle_models_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vehicle_models_id_seq', 120, true);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: vehicle_makes vehicle_makes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vehicle_makes
    ADD CONSTRAINT vehicle_makes_pkey PRIMARY KEY (id);


--
-- Name: vehicle_models vehicle_models_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vehicle_models
    ADD CONSTRAINT vehicle_models_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

