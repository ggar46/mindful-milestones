--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Homebrew)
-- Dumped by pg_dump version 14.6 (Homebrew)

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
-- Name: goal_info; Type: TABLE; Schema: public; Owner: tpl622_2
--

CREATE TABLE public.goal_info (
    id integer NOT NULL,
    image_fkey character varying(255),
    date date,
    goal_purpose character varying(255) NOT NULL,
    goal_obstacle character varying(255) NOT NULL,
    strategy character varying(255) NOT NULL,
    goal character varying(255) NOT NULL,
    user_fkey character varying(255)
);


ALTER TABLE public.goal_info OWNER TO tpl622_2;

--
-- Name: goal_info_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl622_2
--

ALTER TABLE public.goal_info ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.goal_info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: image_tracker; Type: TABLE; Schema: public; Owner: tpl622_2
--

CREATE TABLE public.image_tracker (
    image_url character varying(255) NOT NULL,
    alt_text character varying(255),
    user_fkey character varying(255)
);


ALTER TABLE public.image_tracker OWNER TO tpl622_2;

--
-- Name: user_table; Type: TABLE; Schema: public; Owner: tpl622_2
--

CREATE TABLE public.user_table (
    user_id character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.user_table OWNER TO tpl622_2;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl622_2
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO tpl622_2;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl622_2
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.user_table.user_id;


--
-- Name: task_tracker; Type: TABLE; Schema: public; Owner: tpl622_2
--

CREATE TABLE public.task_tracker (
    id integer NOT NULL,
    goal_fkey character varying(255) NOT NULL,
    task_text character varying(255) NOT NULL,
    is_checked boolean DEFAULT false
);


ALTER TABLE public.task_tracker OWNER TO tpl622_2;

--
-- Name: task_tracker_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl622_2
--

ALTER TABLE public.task_tracker ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.task_tracker_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: goal_info; Type: TABLE DATA; Schema: public; Owner: tpl622_2
--

INSERT INTO public.goal_info (id, image_fkey, date, goal_purpose, goal_obstacle, strategy, goal, user_fkey) OVERRIDING SYSTEM VALUE VALUES (37, 'https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '2023-12-18', 'Expand skillset, keep brain busy.', 'Lack motivation during the evenings.', 'Start with small but consistent lessons.', 'Self-Study 2 hours per week', 'google-oauth2|103809964263193763340');
INSERT INTO public.goal_info (id, image_fkey, date, goal_purpose, goal_obstacle, strategy, goal, user_fkey) OVERRIDING SYSTEM VALUE VALUES (38, 'https://images.pexels.com/photos/2897128/pexels-photo-2897128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '2023-08-10', 'Crochet a blanket for Christmas.', 'Don''t have materials or skills.', 'Watch two youtube videos every weekend and practice throughout the week. Ask crochet community for help.', 'Learn to Crochet', 'google-oauth2|103809964263193763340');
INSERT INTO public.goal_info (id, image_fkey, date, goal_purpose, goal_obstacle, strategy, goal, user_fkey) OVERRIDING SYSTEM VALUE VALUES (53, 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '2023-07-18', 'Have more fiber and variety in my diet', 'Do not crave fruit and do not always have fruit. Pastries are easier to eat.', 'Cut fruit as soon as bought from store, consume lots of smoothies this summer.', 'Eat More Fruit', 'google-oauth2|103809964263193763340');


--
-- Data for Name: image_tracker; Type: TABLE DATA; Schema: public; Owner: tpl622_2
--

INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/10035858/pexels-photo-10035858.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Pink Clouds and Sea ', 'google-oauth2|103809964263193763340');
INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Black Click Pen on White Paper', 'google-oauth2|103809964263193763340');
INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/36363/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940', 'White Stone Mountains', 'google-oauth2|103809964263193763340');
INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Person Swimming on Body of Water', 'google-oauth2|103809964263193763340');
INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Top View Photo of Food Dessert', 'google-oauth2|103809964263193763340');
INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/2897128/pexels-photo-2897128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Person Holding Crochet Hook', 'google-oauth2|103809964263193763340');
INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/5926380/pexels-photo-5926380.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'From above crop faceless male developer in black hoodie writing software code on netbook while working in light studio', 'google-oauth2|103809964263193763340');
INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/1883385/pexels-photo-1883385.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Selective Focus Photography of Pink and Yellow Tulips Flowers', 'google-oauth2|103809964263193763340');
INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Close-up Photograph of Flowers', 'google-oauth2|103809964263193763340');
INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Scenic View Of Snow Capped Mountains During Night', 'google-oauth2|103809964263193763340');
INSERT INTO public.image_tracker (image_url, alt_text, user_fkey) VALUES ('https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Mountain Covered Snow Under Star', 'google-oauth2|103809964263193763340');


--
-- Data for Name: task_tracker; Type: TABLE DATA; Schema: public; Owner: tpl622_2
--

INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (52, '36', 'Buy fruit', true);
INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (59, '37', 'another', true);
INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (56, '36', 'newe item', true);
INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (58, '37', 'new', true);
INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (60, '59', 'hike', true);
INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (61, '60', 'jnk', true);
INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (62, '61', 'jjjj', false);
INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (21, '17', 'something else', true);
INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (50, '29', 'dd', false);
INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (51, '32', 'new item2', false);
INSERT INTO public.task_tracker (id, goal_fkey, task_text, is_checked) OVERRIDING SYSTEM VALUE VALUES (57, '37', 'nuevo', true);


--
-- Data for Name: user_table; Type: TABLE DATA; Schema: public; Owner: tpl622_2
--

INSERT INTO public.user_table (user_id, email) VALUES ('google-oauth2|103809964263193763340', 'gissellegar46@gmail.com');
INSERT INTO public.user_table (user_id, email) VALUES ('1', 'filler');
INSERT INTO public.user_table (user_id, email) VALUES ('google-oauth2|104622393866883503169', 'gigarcia1027@gmail.com');


--
-- Name: goal_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl622_2
--

SELECT pg_catalog.setval('public.goal_info_id_seq', 61, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl622_2
--

SELECT pg_catalog.setval('public.students_id_seq', 1, true);


--
-- Name: task_tracker_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl622_2
--

SELECT pg_catalog.setval('public.task_tracker_id_seq', 62, true);


--
-- Name: goal_info goal_info_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_2
--

ALTER TABLE ONLY public.goal_info
    ADD CONSTRAINT goal_info_pkey PRIMARY KEY (id);


--
-- Name: image_tracker image_tracker_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_2
--

ALTER TABLE ONLY public.image_tracker
    ADD CONSTRAINT image_tracker_pkey PRIMARY KEY (image_url);


--
-- Name: task_tracker task_tracker_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_2
--

ALTER TABLE ONLY public.task_tracker
    ADD CONSTRAINT task_tracker_pkey PRIMARY KEY (id);


--
-- Name: user_table user_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_2
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: goal_info goal_info_image_fkey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl622_2
--

ALTER TABLE ONLY public.goal_info
    ADD CONSTRAINT goal_info_image_fkey_fkey FOREIGN KEY (image_fkey) REFERENCES public.image_tracker(image_url);


--
-- Name: goal_info goal_info_user_fkey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl622_2
--

ALTER TABLE ONLY public.goal_info
    ADD CONSTRAINT goal_info_user_fkey_fkey FOREIGN KEY (user_fkey) REFERENCES public.user_table(user_id);


--
-- Name: image_tracker image_tracker_user_fkey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl622_2
--

ALTER TABLE ONLY public.image_tracker
    ADD CONSTRAINT image_tracker_user_fkey_fkey FOREIGN KEY (user_fkey) REFERENCES public.user_table(user_id);


--
-- PostgreSQL database dump complete
--

