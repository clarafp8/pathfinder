-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-03-2026 a las 19:27:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pathfinder`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro`
--

CREATE TABLE `centro` (
  `id_centro` int(11) NOT NULL,
  `codigo_postal` varchar(255) DEFAULT NULL,
  `es_university` bit(1) DEFAULT NULL,
  `latitud` double DEFAULT NULL,
  `longitud` double DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `provincia` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuestionario`
--

CREATE TABLE `cuestionario` (
  `id_cuestionario` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `nota_media` double DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_estudio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`nota_media`, `id_usuario`, `id_estudio`) VALUES
(6.47, 16, NULL),
(5.68, 17, NULL),
(9.36, 18, NULL),
(7.62, 19, NULL),
(9.96, 20, NULL),
(9.63, 21, NULL),
(8.91, 22, NULL),
(5.41, 23, NULL),
(6.24, 24, NULL),
(7.87, 25, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudio`
--

CREATE TABLE `estudio` (
  `id_estudio` int(11) NOT NULL,
  `estudio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orientador`
--

CREATE TABLE `orientador` (
  `disponibilidad` text DEFAULT NULL,
  `especialidad` varchar(255) DEFAULT NULL,
  `informacion_personal` text DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `orientador`
--

INSERT INTO `orientador` (`disponibilidad`, `especialidad`, `informacion_personal`, `id_usuario`) VALUES
(NULL, 'Carreras Técnicas', 'Tempore commodi illum deleniti. Laborum nesciunt necessitatibus. Possimus quo quod necessitatibus omnis facilis.', 26),
(NULL, 'FP', 'Voluptatum commodi fuga consequuntur. Atque sequi rerum at accusantium fuga distinctio. Reiciendis aliquam atque praesentium molestias quisquam ipsum quaerat. Doloremque ullam excepturi. Libero nulla nostrum magni deleniti rerum quidem.', 27),
(NULL, 'Artes', 'Aliquam assumenda deserunt ad alias cum. Quos hic fugit quidem fugit. Laborum at eos praesentium voluptate laboriosam saepe.', 28),
(NULL, 'Carreras Técnicas', 'Rerum ullam libero. Corrupti iure incidunt quod. Amet id perferendis. Dolore recusandae ex. Quo soluta vitae eos est illo quos iure.', 29),
(NULL, 'Carreras Técnicas', 'Iusto deserunt voluptates. Neque culpa est facere eos officia. Omnis adipisci sit fugit aspernatur libero quos. Aperiam odit architecto fugiat nostrum. Impedit eum nisi.', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

CREATE TABLE `publicacion` (
  `id_publicacion` int(11) NOT NULL,
  `contenido` text DEFAULT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_publicacion_padre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rama`
--

CREATE TABLE `rama` (
  `id_rama` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `id_cuestionario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `realiza_test`
--

CREATE TABLE `realiza_test` (
  `fecha_realizacion_test` datetime(6) NOT NULL,
  `puntuacion` double DEFAULT NULL,
  `id_cuestionario` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulacion`
--

CREATE TABLE `titulacion` (
  `id_titulacion` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `id_rama` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulacion_centro`
--

CREATE TABLE `titulacion_centro` (
  `id_titulacion` int(11) NOT NULL,
  `id_centro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL,
  `correoe` varchar(150) NOT NULL,
  `fecha_nac` date DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `provincia` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `apellidos`, `contrasena`, `correoe`, `fecha_nac`, `nombre`, `provincia`) VALUES
(16, 'Garza Nieves', 'password123', 'daniela.lomeli@hotmail.com', '1990-01-01', 'Jacobo', 'Canarias'),
(17, 'Gavilán Suárez', 'password123', 'hugo.partida@gmail.com', '2001-06-02', 'Ana María', 'Castilla la Mancha'),
(18, 'de Anda Garza', 'password123', 'barbara.trejo@yahoo.com', '1990-01-01', 'Rosario', 'Cataluña'),
(19, 'Curiel Aponte', 'password123', 'octavio.espinosa@hotmail.com', '1990-01-01', 'Antonio', 'Comunidad Valenciana'),
(20, 'Mares Gaona', 'password123', 'eloisa.toledo@hotmail.com', '2004-01-01', 'Eloisa', 'Comunidad de Madrid'),
(21, 'Rivas Lovato', 'password123', 'angela.loya@yahoo.com', '1990-01-01', 'Armando', 'La Rioja'),
(22, 'Rubio Matías', 'password123', 'mariajose.posada@gmail.com', '1990-01-01', 'Claudia', 'País Vasco'),
(23, 'Reynoso Miramontes', 'password123', 'pablo.hernandes@yahoo.com', '1990-01-01', 'Octavio', 'Comunidad de Madrid'),
(24, 'Parra Pantoja', 'password123', 'adela.morales@hotmail.com', '1990-01-01', 'Agustín', 'Comunidad Valenciana'),
(25, 'Salazar Verdugo', 'password123', 'gloria.melendez@hotmail.com', '1990-01-01', 'Claudia', 'Aragón'),
(26, 'Navarrete', 'admin123', 'sonia.loya@yahoo.com', '1990-01-01', 'Jacobo', 'Baleares'),
(27, 'Borrego', 'admin123', 'juancarlos.serna@yahoo.com', '1990-01-01', 'Gerardo', 'Aragón'),
(28, 'Ceballos', 'admin123', 'tomas.benitez@hotmail.com', '1990-01-01', 'Elsa', 'Comunidad de Madrid'),
(29, 'Reyes', 'admin123', 'pedro.cazares@gmail.com', '1990-01-01', 'Jaime', 'Castilla-La Mancha'),
(30, 'Orellana', 'admin123', 'florencia.jaimes@yahoo.com', '1990-01-01', 'Adela', 'Comunidad Valenciana'),
(31, 'Frigolet', 'password123', 'clara@clara.com', '2005-12-26', 'Clara', 'Sevilla');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion`
--

CREATE TABLE `valoracion` (
  `id_valoracion` int(11) NOT NULL,
  `comentario` text DEFAULT NULL,
  `fecha_valoracion` datetime(6) DEFAULT NULL,
  `puntuacion` int(11) DEFAULT NULL,
  `id_estudiante` int(11) NOT NULL,
  `id_orientador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `centro`
--
ALTER TABLE `centro`
  ADD PRIMARY KEY (`id_centro`);

--
-- Indices de la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  ADD PRIMARY KEY (`id_cuestionario`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `FK3t31sc9olvhixssplag4unc9d` (`id_estudio`);

--
-- Indices de la tabla `estudio`
--
ALTER TABLE `estudio`
  ADD PRIMARY KEY (`id_estudio`),
  ADD UNIQUE KEY `UKfc3oeplahsbr27pcwvbsicat` (`estudio`);

--
-- Indices de la tabla `orientador`
--
ALTER TABLE `orientador`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `FK9kh5k6pnpbv4xeqrdwv4585b7` (`id_usuario`),
  ADD KEY `FK9q9ju2mx852svirphoiibg8an` (`id_publicacion_padre`);

--
-- Indices de la tabla `rama`
--
ALTER TABLE `rama`
  ADD PRIMARY KEY (`id_rama`),
  ADD KEY `FKstkdofhcvpwv3tpvsgy9ottdo` (`id_cuestionario`);

--
-- Indices de la tabla `realiza_test`
--
ALTER TABLE `realiza_test`
  ADD PRIMARY KEY (`fecha_realizacion_test`,`id_cuestionario`,`id_usuario`),
  ADD KEY `FKqaljfv3c0ewlcon3qlohtp19i` (`id_cuestionario`),
  ADD KEY `FKt39tomfaop6ereou271rjfo7v` (`id_usuario`);

--
-- Indices de la tabla `titulacion`
--
ALTER TABLE `titulacion`
  ADD PRIMARY KEY (`id_titulacion`),
  ADD KEY `FKk0l52m1kgcw2y1m29p7sa26ej` (`id_rama`);

--
-- Indices de la tabla `titulacion_centro`
--
ALTER TABLE `titulacion_centro`
  ADD KEY `FKjayjiorv1gnrigw0bc2eidu1i` (`id_centro`),
  ADD KEY `FK4u49yh9ouaw8id07rflr4qacd` (`id_titulacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK8kuyardau23d1ven83a6u776g` (`correoe`);

--
-- Indices de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD PRIMARY KEY (`id_valoracion`),
  ADD KEY `FK5j3jabm4rjnepy1yvng7fad88` (`id_estudiante`),
  ADD KEY `FK7g9r3pwkh622gckbg3ue73l59` (`id_orientador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `centro`
--
ALTER TABLE `centro`
  MODIFY `id_centro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  MODIFY `id_cuestionario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estudio`
--
ALTER TABLE `estudio`
  MODIFY `id_estudio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rama`
--
ALTER TABLE `rama`
  MODIFY `id_rama` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `titulacion`
--
ALTER TABLE `titulacion`
  MODIFY `id_titulacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  MODIFY `id_valoracion` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `FK3t31sc9olvhixssplag4unc9d` FOREIGN KEY (`id_estudio`) REFERENCES `estudio` (`id_estudio`),
  ADD CONSTRAINT `FK5a2y49gqj50k58rcckgh5cdue` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `orientador`
--
ALTER TABLE `orientador`
  ADD CONSTRAINT `FKc4wwr7qr8li7a1wv53s8rjeir` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `FK9kh5k6pnpbv4xeqrdwv4585b7` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `FK9q9ju2mx852svirphoiibg8an` FOREIGN KEY (`id_publicacion_padre`) REFERENCES `publicacion` (`id_publicacion`);

--
-- Filtros para la tabla `rama`
--
ALTER TABLE `rama`
  ADD CONSTRAINT `FKstkdofhcvpwv3tpvsgy9ottdo` FOREIGN KEY (`id_cuestionario`) REFERENCES `cuestionario` (`id_cuestionario`);

--
-- Filtros para la tabla `realiza_test`
--
ALTER TABLE `realiza_test`
  ADD CONSTRAINT `FKqaljfv3c0ewlcon3qlohtp19i` FOREIGN KEY (`id_cuestionario`) REFERENCES `cuestionario` (`id_cuestionario`),
  ADD CONSTRAINT `FKt39tomfaop6ereou271rjfo7v` FOREIGN KEY (`id_usuario`) REFERENCES `estudiante` (`id_usuario`);

--
-- Filtros para la tabla `titulacion`
--
ALTER TABLE `titulacion`
  ADD CONSTRAINT `FKk0l52m1kgcw2y1m29p7sa26ej` FOREIGN KEY (`id_rama`) REFERENCES `rama` (`id_rama`);

--
-- Filtros para la tabla `titulacion_centro`
--
ALTER TABLE `titulacion_centro`
  ADD CONSTRAINT `FK4u49yh9ouaw8id07rflr4qacd` FOREIGN KEY (`id_titulacion`) REFERENCES `titulacion` (`id_titulacion`),
  ADD CONSTRAINT `FKjayjiorv1gnrigw0bc2eidu1i` FOREIGN KEY (`id_centro`) REFERENCES `centro` (`id_centro`);

--
-- Filtros para la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD CONSTRAINT `FK5j3jabm4rjnepy1yvng7fad88` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id_usuario`),
  ADD CONSTRAINT `FK7g9r3pwkh622gckbg3ue73l59` FOREIGN KEY (`id_orientador`) REFERENCES `orientador` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
