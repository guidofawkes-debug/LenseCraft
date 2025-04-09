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
-- Name: cart_items; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    session_id text NOT NULL,
    product_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.cart_items OWNER TO neondb_owner;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO neondb_owner;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    image_url text,
    product_count integer DEFAULT 0
);


ALTER TABLE public.categories OWNER TO neondb_owner;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO neondb_owner;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: neondb_owner
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


ALTER TABLE public.products OWNER TO neondb_owner;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO neondb_owner;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vehicle_makes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.vehicle_makes (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.vehicle_makes OWNER TO neondb_owner;

--
-- Name: vehicle_makes_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.vehicle_makes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicle_makes_id_seq OWNER TO neondb_owner;

--
-- Name: vehicle_makes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.vehicle_makes_id_seq OWNED BY public.vehicle_makes.id;


--
-- Name: vehicle_models; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.vehicle_models (
    id integer NOT NULL,
    make_id integer NOT NULL,
    name text NOT NULL,
    year_start integer,
    year_end integer
);


ALTER TABLE public.vehicle_models OWNER TO neondb_owner;

--
-- Name: vehicle_models_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.vehicle_models_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicle_models_id_seq OWNER TO neondb_owner;

--
-- Name: vehicle_models_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.vehicle_models_id_seq OWNED BY public.vehicle_models.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vehicle_makes id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_makes ALTER COLUMN id SET DEFAULT nextval('public.vehicle_makes_id_seq'::regclass);


--
-- Name: vehicle_models id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_models ALTER COLUMN id SET DEFAULT nextval('public.vehicle_models_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.cart_items (id, session_id, product_id, quantity, created_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.categories (id, name, description, image_url, product_count) FROM stdin;
1	Headlights	LED and HID headlight assemblies	https://images.unsplash.com/photo-1558562720-1297f0183887?auto=format&fit=crop&q=80	24
2	Tail Lights	LED and standard tail light assemblies	https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80	19
3	Signal Lights	Turn signal light assemblies	https://images.unsplash.com/photo-1501061987532-3a20cdbd5ebd?auto=format&fit=crop&q=80	12
4	Fog Lights	Fog and driving light kits	https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?auto=format&fit=crop&q=80	8
37	Interior Lights	LED interior lighting kits and accessories	https://images.unsplash.com/photo-1619160970897-17b8d45f437f?auto=format&fit=crop&q=80	5
38	Headlights	LED and HID headlight assemblies	https://images.unsplash.com/photo-1558562720-1297f0183887?auto=format&fit=crop&q=80	24
39	Tail Lights	LED and standard tail light assemblies	https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80	19
40	Signal Lights	Turn signal light assemblies	https://images.unsplash.com/photo-1501061987532-3a20cdbd5ebd?auto=format&fit=crop&q=80	12
41	Fog Lights	Fog and driving light kits	https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?auto=format&fit=crop&q=80	8
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.products (id, name, description, price, brand, image_url, category, compatible_vehicles, featured, stock_quantity, tags, created_at) FROM stdin;
59	LED Headlight Assembly	High-performance LED headlight assembly for Toyota Corolla. Provides better visibility and a modern look.	299.99	DEPO	https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80	Headlights	["Toyota Corolla 2018-2022"]	t	15	["LED", "Toyota", "Headlights", "New Arrival"]	2025-04-09 13:53:35.088215
60	Premium Tail Light Set	Complete tail light set for Honda Civic. LED elements for enhanced visibility and modern styling.	249.99	TYC	https://images.unsplash.com/photo-1560294559-1774a164fb0a?auto=format&fit=crop&q=80	Tail Lights	["Honda Civic 2016-2021"]	t	8	["LED", "Honda", "Tail Lights", "Best Seller"]	2025-04-09 13:53:35.119403
61	LED Fog Light Kit	Complete fog light kit for Mazda 3. LED bulbs for maximum visibility in adverse weather conditions.	199.99	LUCID	https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80	Fog Lights	["Mazda 3 2019-2023"]	t	3	["LED", "Mazda", "Fog Lights", "Limited Stock"]	2025-04-09 13:53:35.137968
62	Signal Light Assembly	Front signal light assembly for Subaru Forester. OEM quality replacement.	129.99	DEPO	https://images.unsplash.com/photo-1500463959177-e0869687df26?auto=format&fit=crop&q=80	Signal Lights	["Subaru Forester 2017-2020"]	t	12	["LED", "Subaru", "Signal Lights", "Sale"]	2025-04-09 13:53:35.156482
63	LED DRL Kit	Daytime running light kit with automatic on/off function. Easy installation.	149.99	LUCID	https://images.unsplash.com/photo-1542683205-2da0c3bf235e?auto=format&fit=crop&q=80	Headlights	["Toyota Camry 2018-2023", "Honda Accord 2018-2023"]	f	7	["LED", "DRL", "Universal"]	2025-04-09 13:53:35.174826
64	HID Conversion Kit	HID conversion kit with all necessary components for installation. 6000K white light.	189.99	TYC	https://images.unsplash.com/photo-1527247162509-cf96942232c1?auto=format&fit=crop&q=80	Headlights	["Multiple vehicles"]	f	9	["HID", "Conversion", "Universal"]	2025-04-09 13:53:35.193651
1	Toyota Corolla LED Headlights	Direct replacement LED headlight assembly for Toyota Corolla with modern design and improved visibility.	299.99	DEPO	https://images.unsplash.com/photo-1580273707978-be653d042072?auto=format&fit=crop&q=80	Headlights	["Toyota Corolla 2018-2022"]	t	15	["LED", "Toyota", "Headlights", "New Arrival"]	2025-04-09 07:23:08.291827
2	Honda Civic LED Tail Lights	Custom LED tail light set for Honda Civic with sequential turn signals and modern styling.	249.99	TYC	https://images.unsplash.com/photo-1590543771922-473212fff7e8?auto=format&fit=crop&q=80	Tail Lights	["Honda Civic 2016-2021"]	t	8	["LED", "Honda", "Tail Lights", "Best Seller"]	2025-04-09 07:23:08.313238
3	Subaru Universal LED Fog Lights	Universal LED fog light kit for Subaru vehicles with bright white output and weather-resistant housing.	199.99	LUCID	https://images.unsplash.com/photo-1543966888-7c1dc482a810?auto=format&fit=crop&q=80	Fog Lights	["Mazda 3 2019-2023"]	t	3	["LED", "Mazda", "Fog Lights", "Limited Stock"]	2025-04-09 07:23:08.33288
4	Nissan LED Side Markers	Replacement LED side marker lights for Nissan vehicles with amber turn signal function.	129.99	DEPO	https://images.unsplash.com/photo-1575569664165-4c9d0cca5910?auto=format&fit=crop&q=80	Signal Lights	["Subaru Forester 2017-2020"]	t	12	["LED", "Subaru", "Signal Lights", "Sale"]	2025-04-09 07:23:08.352499
5	Universal Daytime Running Lights	Universal LED daytime running lights that can be installed on any Japanese vehicle for improved visibility.	149.99	LUCID	https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80	Headlights	["Toyota Camry 2018-2023", "Honda Accord 2018-2023"]	t	7	["LED", "DRL", "Universal"]	2025-04-09 07:23:08.372116
6	Premium HID Conversion System	Complete HID conversion system for upgrading standard halogen headlights to xenon HID with higher output.	189.99	TYC	https://images.unsplash.com/photo-1551830820-330a71ba4aab?auto=format&fit=crop&q=80	Headlights	["Multiple vehicles"]	t	9	["HID", "Conversion", "Universal"]	2025-04-09 07:23:08.391942
55	Mitsubishi LED Light Bar	High-output LED light bar for Mitsubishi vehicles with off-road capability and water-resistant design.	149.99	PIAA	https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80	Fog Lights	["Mitsubishi Lancer", "Mitsubishi Outlander"]	t	15	[]	2025-04-09 13:04:01.674734
56	Toyota Projector Headlights	High-quality projector headlights for Toyota models with focused beam pattern and modern black housing.	249.99	DEPO	https://images.unsplash.com/photo-1553949333-0510da388b82?auto=format&fit=crop&q=80	Headlights	["Toyota Camry", "Toyota Corolla"]	t	8	[]	2025-04-09 13:04:01.674734
57	Honda LED Interior Lighting Kit	Complete LED interior lighting kit for Honda vehicles with blue accent lighting and easy installation.	39.99	JDM	https://images.unsplash.com/photo-1619160970897-17b8d45f437f?auto=format&fit=crop&q=80	Interior Lights	["Honda Civic", "Honda Accord", "Honda CR-V"]	t	30	[]	2025-04-09 13:04:01.674734
58	Nissan Sequential Turn Signals	Dynamic sequential turn signal lights for Nissan vehicles with modern styling and plug-and-play installation.	89.99	TYC	https://images.unsplash.com/photo-1506610654-064fbba4780c?auto=format&fit=crop&q=80	Signal Lights	["Nissan 350Z", "Nissan 370Z", "Nissan GT-R"]	t	12	[]	2025-04-09 13:04:01.674734
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, username, password) FROM stdin;
\.


--
-- Data for Name: vehicle_makes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.vehicle_makes (id, name) FROM stdin;
1	Toyota
2	Honda
3	Mazda
4	Subaru
5	Nissan
6	Mitsubishi
7	Toyota
8	Honda
9	Mazda
10	Subaru
11	Nissan
12	Mitsubishi
13	Toyota
14	Honda
15	Mazda
16	Subaru
17	Nissan
18	Mitsubishi
19	Toyota
20	Honda
21	Mazda
22	Subaru
23	Nissan
24	Mitsubishi
25	Toyota
26	Honda
27	Mazda
28	Subaru
29	Nissan
30	Mitsubishi
31	Toyota
32	Honda
33	Mazda
34	Subaru
35	Nissan
36	Mitsubishi
37	Toyota
38	Honda
39	Mazda
40	Subaru
41	Nissan
42	Mitsubishi
43	Toyota
44	Honda
45	Mazda
46	Subaru
47	Nissan
48	Mitsubishi
49	Toyota
50	Honda
51	Mazda
52	Subaru
53	Nissan
54	Mitsubishi
55	Toyota
56	Honda
57	Mazda
58	Subaru
59	Nissan
60	Mitsubishi
\.


--
-- Data for Name: vehicle_models; Type: TABLE DATA; Schema: public; Owner: neondb_owner
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
11	1	Corolla	2018	2022
12	1	Camry	2018	2023
13	1	RAV4	2019	2023
14	2	Civic	2016	2021
15	2	Accord	2018	2023
16	2	CR-V	2017	2022
17	3	Mazda 3	2019	2023
18	3	CX-5	2017	2023
19	4	Forester	2017	2020
20	4	Impreza	2017	2021
21	1	Corolla	2018	2022
22	1	Camry	2018	2023
23	1	RAV4	2019	2023
24	2	Civic	2016	2021
25	2	Accord	2018	2023
26	2	CR-V	2017	2022
27	3	Mazda 3	2019	2023
28	3	CX-5	2017	2023
29	4	Forester	2017	2020
30	4	Impreza	2017	2021
31	1	Corolla	2018	2022
32	1	Camry	2018	2023
33	1	RAV4	2019	2023
34	2	Civic	2016	2021
35	2	Accord	2018	2023
36	2	CR-V	2017	2022
37	3	Mazda 3	2019	2023
38	3	CX-5	2017	2023
39	4	Forester	2017	2020
40	4	Impreza	2017	2021
41	1	Corolla	2018	2022
42	1	Camry	2018	2023
43	1	RAV4	2019	2023
44	2	Civic	2016	2021
45	2	Accord	2018	2023
46	2	CR-V	2017	2022
47	3	Mazda 3	2019	2023
48	3	CX-5	2017	2023
49	4	Forester	2017	2020
50	4	Impreza	2017	2021
51	1	Corolla	2018	2022
52	1	Camry	2018	2023
53	1	RAV4	2019	2023
54	2	Civic	2016	2021
55	2	Accord	2018	2023
56	2	CR-V	2017	2022
57	3	Mazda 3	2019	2023
58	3	CX-5	2017	2023
59	4	Forester	2017	2020
60	4	Impreza	2017	2021
61	1	Corolla	2018	2022
62	1	Camry	2018	2023
63	1	RAV4	2019	2023
64	2	Civic	2016	2021
65	2	Accord	2018	2023
66	2	CR-V	2017	2022
67	3	Mazda 3	2019	2023
68	3	CX-5	2017	2023
69	4	Forester	2017	2020
70	4	Impreza	2017	2021
71	1	Corolla	2018	2022
72	1	Camry	2018	2023
73	1	RAV4	2019	2023
74	2	Civic	2016	2021
75	2	Accord	2018	2023
76	2	CR-V	2017	2022
77	3	Mazda 3	2019	2023
78	3	CX-5	2017	2023
79	4	Forester	2017	2020
80	4	Impreza	2017	2021
81	1	Corolla	2018	2022
82	1	Camry	2018	2023
83	1	RAV4	2019	2023
84	2	Civic	2016	2021
85	2	Accord	2018	2023
86	2	CR-V	2017	2022
87	3	Mazda 3	2019	2023
88	3	CX-5	2017	2023
89	4	Forester	2017	2020
90	4	Impreza	2017	2021
91	1	Corolla	2018	2022
92	1	Camry	2018	2023
93	1	RAV4	2019	2023
94	2	Civic	2016	2021
95	2	Accord	2018	2023
96	2	CR-V	2017	2022
97	3	Mazda 3	2019	2023
98	3	CX-5	2017	2023
99	4	Forester	2017	2020
100	4	Impreza	2017	2021
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.categories_id_seq', 41, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.products_id_seq', 64, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: vehicle_makes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.vehicle_makes_id_seq', 60, true);


--
-- Name: vehicle_models_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.vehicle_models_id_seq', 100, true);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: vehicle_makes vehicle_makes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_makes
    ADD CONSTRAINT vehicle_makes_pkey PRIMARY KEY (id);


--
-- Name: vehicle_models vehicle_models_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_models
    ADD CONSTRAINT vehicle_models_pkey PRIMARY KEY (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

