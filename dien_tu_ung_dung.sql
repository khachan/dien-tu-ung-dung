-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2016 at 02:16 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dien_tu_ung_dung`
--

-- --------------------------------------------------------

--
-- Table structure for table `danh_muc`
--

CREATE TABLE IF NOT EXISTS `danh_muc` (
  `ma_danh_muc` bigint(20) NOT NULL AUTO_INCREMENT,
  `ten_danh_muc` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `chuc_nang` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mo_ta` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `so_linh_kien` int(11) NOT NULL,
  PRIMARY KEY (`ma_danh_muc`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `dung_cu`
--

CREATE TABLE IF NOT EXISTS `dung_cu` (
  `ma_dung_cu` bigint(20) NOT NULL AUTO_INCREMENT,
  `ten_dung_cu` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `so_luong` int(11) NOT NULL,
  `vi_tri` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `chuc_nang` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `kich_co` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `hinh_anh` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mo_ta` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ma_dung_cu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `linh_kien`
--

CREATE TABLE IF NOT EXISTS `linh_kien` (
  `ma_linh_kien` bigint(20) NOT NULL AUTO_INCREMENT,
  `ten_linh_kien` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `so_luong` double NOT NULL,
  `tinh_trang` int(11) NOT NULL,
  `loai` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ma_danh_muc` bigint(20) NOT NULL,
  `don_vi_tinh` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `do_lon` double NOT NULL,
  `nha_san_xuat` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `gia` double NOT NULL,
  `chuc_nang` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mo_ta` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `vi_tri` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ma_linh_kien`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `san_pham`
--

CREATE TABLE IF NOT EXISTS `san_pham` (
  `ma_san_pham` bigint(11) NOT NULL AUTO_INCREMENT,
  `ten_san_pham` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mach_nguyen_ly` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mach_in` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `linh_kien` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `so_luong` int(11) NOT NULL,
  `tinh_trang` int(11) NOT NULL,
  `chi_phi` double NOT NULL,
  `chuc_nang` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phien_ban` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `so_linh_kien` int(11) NOT NULL,
  PRIMARY KEY (`ma_san_pham`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
