-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2026 at 02:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hmp_pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `code`, `name`, `description`, `price`, `stock`, `created_at`) VALUES
(14, 'P1001', 'Coca Cola 1.5L', 'Softdrink Bottle 1.5 Liter', 75.00, 0, '2026-02-26 06:36:57'),
(15, 'P1002', 'Lucky Me Pancit Canton', 'Instant Noodles 80g', 18.00, 25, '2026-02-26 06:36:57'),
(16, 'P1003', 'Gardenia Bread', 'White Bread Large', 85.00, 3, '2026-02-26 06:36:57'),
(17, 'P1004', 'Bear Brand 33g', 'Powdered Milk Sachet', 15.00, 291, '2026-02-26 06:36:57'),
(18, 'P1005', 'Alaska Condensed', 'Condensed Milk 300ml', 42.00, 90, '2026-02-26 06:36:57');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `user_id`, `total_amount`, `created_at`) VALUES
(11, 2, 168.00, '2026-02-24 06:37:09'),
(12, 3, 93.00, '2026-02-25 06:37:09'),
(13, 2, 150.00, '2026-02-26 06:37:09'),
(16, 2, 15.00, '2026-03-03 02:51:04'),
(17, 3, 75.00, '2026-03-03 03:20:19'),
(19, 2, 165.00, '2026-03-03 03:48:15'),
(20, 2, 51.00, '2026-03-03 04:16:11'),
(21, 2, 30.00, '2026-03-03 04:17:12'),
(22, 2, 36.00, '2026-03-03 04:19:08'),
(23, 2, 36.00, '2026-03-03 04:19:58'),
(24, 2, 30.00, '2026-03-03 04:22:00'),
(25, 2, 170.00, '2026-03-03 04:37:59'),
(26, 2, 51.00, '2026-03-03 04:54:05'),
(27, 2, 51.00, '2026-03-04 00:26:41');

-- --------------------------------------------------------

--
-- Table structure for table `sale_items`
--

CREATE TABLE `sale_items` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT 'pcs',
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sale_items`
--

INSERT INTO `sale_items` (`id`, `sale_id`, `product_id`, `quantity`, `unit`, `subtotal`) VALUES
(43, 11, 14, 2, 'pcs', 150.00),
(44, 11, 17, 1, 'pcs', 15.00),
(45, 11, 15, 1, 'pcs', 18.00),
(46, 12, 16, 1, 'pcs', 85.00),
(47, 12, 17, 2, 'pcs', 30.00),
(48, 13, 18, 2, 'pcs', 84.00),
(49, 13, 15, 3, 'pcs', 54.00),
(50, 16, 17, 1, 'pcs', 15.00),
(51, 17, 14, 1, 'pcs', 75.00),
(52, 19, 14, 2, 'pcs', 150.00),
(53, 19, 17, 1, 'pcs', 15.00),
(54, 20, 15, 2, 'pcs', 36.00),
(55, 20, 17, 1, 'pcs', 15.00),
(56, 21, 17, 2, 'pcs', 30.00),
(57, 22, 15, 2, 'pcs', 36.00),
(58, 23, 15, 2, 'pcs', 36.00),
(59, 24, 17, 2, 'pcs', 30.00),
(60, 25, 16, 2, 'pcs', 170.00),
(61, 26, 15, 2, 'pcs', 36.00),
(62, 26, 17, 1, 'pcs', 15.00),
(63, 27, 17, 1, 'pcs', 15.00),
(64, 27, 15, 2, 'pcs', 36.00);

-- --------------------------------------------------------

--
-- Table structure for table `stock_history`
--

CREATE TABLE `stock_history` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `stock_change` int(11) NOT NULL,
  `movement_type` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_history`
--

INSERT INTO `stock_history` (`id`, `product_id`, `stock_change`, `movement_type`, `created_at`) VALUES
(1, 14, 50, 'restock', '2026-02-19 09:00:00'),
(2, 15, 80, 'restock', '2026-02-19 09:05:00'),
(3, 16, 40, 'restock', '2026-02-19 09:10:00'),
(4, 17, 60, 'restock', '2026-02-19 09:15:00'),
(5, 18, 35, 'restock', '2026-02-19 09:20:00'),
(6, 14, -2, 'sale', '2026-02-24 14:37:09'),
(7, 17, -1, 'sale', '2026-02-24 14:37:09'),
(8, 15, -1, 'sale', '2026-02-24 14:37:09'),
(9, 16, -1, 'sale', '2026-02-25 14:37:09'),
(10, 17, -2, 'sale', '2026-02-25 14:37:09'),
(11, 18, -2, 'sale', '2026-02-26 14:37:09'),
(12, 15, -3, 'sale', '2026-02-26 14:37:09'),
(13, 15, 20, 'restock', '2026-02-27 10:00:00'),
(14, 17, 15, 'restock', '2026-02-27 10:05:00'),
(15, 16, 20, 'RESTOCK', '2026-02-27 10:32:46'),
(16, 16, 10, 'RESTOCK', '2026-02-27 13:49:54'),
(17, 17, -1, 'SALE', '2026-03-03 10:51:04'),
(18, 14, -1, 'SALE', '2026-03-03 11:20:19'),
(19, 15, 2, 'RESTOCK', '2026-03-03 11:40:09'),
(20, 14, -2, 'SALE', '2026-03-03 11:48:15'),
(21, 17, -1, 'SALE', '2026-03-03 11:48:15'),
(22, 15, 3, 'RESTOCK', '2026-03-03 11:48:47'),
(23, 15, -2, 'SALE', '2026-03-03 12:16:12'),
(24, 17, -1, 'SALE', '2026-03-03 12:16:12'),
(25, 17, -2, 'SALE', '2026-03-03 12:17:12'),
(26, 15, -2, 'SALE', '2026-03-03 12:19:08'),
(27, 15, -2, 'SALE', '2026-03-03 12:19:58'),
(28, 17, -2, 'SALE', '2026-03-03 12:22:00'),
(29, 16, -2, 'SALE', '2026-03-03 12:37:59'),
(30, 15, -2, 'SALE', '2026-03-03 12:54:05'),
(31, 17, -1, 'SALE', '2026-03-03 12:54:05'),
(32, 17, -1, 'SALE', '2026-03-04 08:26:41'),
(33, 15, -2, 'SALE', '2026-03-04 08:26:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','cashier') DEFAULT 'cashier',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`) VALUES
(1, 'admin', '$2a$10$3nw7jnDQle2rjeS5J5mu/eYKH1D2g1w1cgvQx.u9FlkCZL4TaTjl6', 'admin', '2026-02-26 01:27:00'),
(2, 'cashier', '$2a$10$EXbfuG.4EHgK4gsOYBT2w.nlw.A3QZzgQ2X5OpYPJPsqQFfYQ7w8a', 'cashier', '2026-02-26 01:44:38'),
(3, 'cashier1', '$2a$10$VAy/q73rUJrayPY/2iaOSenwmbjBfkX6/rjSX/nYJBlSvzTD6xnfi', 'cashier', '2026-02-26 05:46:02'),
(4, 'admin1', '$2a$10$8lsp4zyDHsRFFrui/uCPYeZsVaydXgo10wBDZNNp8cm7eayA7BFou', 'admin', '2026-02-27 02:35:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sales_user` (`user_id`);

--
-- Indexes for table `sale_items`
--
ALTER TABLE `sale_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sale_items_sale` (`sale_id`),
  ADD KEY `fk_sale_items_product` (`product_id`);

--
-- Indexes for table `stock_history`
--
ALTER TABLE `stock_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_stock_product` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `sale_items`
--
ALTER TABLE `sale_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `stock_history`
--
ALTER TABLE `stock_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `fk_sales_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `sale_items`
--
ALTER TABLE `sale_items`
  ADD CONSTRAINT `fk_sale_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_sale_items_sale` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_history`
--
ALTER TABLE `stock_history`
  ADD CONSTRAINT `fk_stock_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `stock_history_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
