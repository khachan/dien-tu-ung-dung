package com.spring.mvc.man.hoang.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the san_pham database table.
 * 
 */
@Entity
@Table(name="san_pham")
public class SanPham extends MyEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ma_san_pham", unique=true, nullable=false)
	private Long maSo;

	@Column(name="chi_phi")
	private double chiPhi;

	@Column(name="chuc_nang")
	private String chucNang;

	@Column(name="linh_kien")
	private String linhKien;

	@Column(name="mach_in")
	private String machIn;

	@Column(name="mach_nguyen_ly")
	private String machNguyenLy;

	@Column(name="phien_ban")
	private String phienBan;

	@Column(name="so_linh_kien")
	private int soLinhKien;

	@Column(name="so_luong")
	private int soLuong;

	@Column(name="ten_san_pham")
	private String ten;

	@Column(name="tinh_trang")
	private int tinhTrang;

	public SanPham() {
	}

	public Long getMaSo() {
		return this.maSo;
	}

	public void setMaSo(Long maSo) {
		this.maSo = maSo;
	}

	public double getChiPhi() {
		return this.chiPhi;
	}

	public void setChiPhi(double chiPhi) {
		this.chiPhi = chiPhi;
	}

	public String getChucNang() {
		return this.chucNang;
	}

	public void setChucNang(String chucNang) {
		this.chucNang = chucNang;
	}

	public String getLinhKien() {
		return this.linhKien;
	}

	public void setLinhKien(String linhKien) {
		this.linhKien = linhKien;
	}

	public String getMachIn() {
		return this.machIn;
	}

	public void setMachIn(String machIn) {
		this.machIn = machIn;
	}

	public String getMachNguyenLy() {
		return this.machNguyenLy;
	}

	public void setMachNguyenLy(String machNguyenLy) {
		this.machNguyenLy = machNguyenLy;
	}

	public String getPhienBan() {
		return this.phienBan;
	}

	public void setPhienBan(String phienBan) {
		this.phienBan = phienBan;
	}

	public int getSoLinhKien() {
		return this.soLinhKien;
	}

	public void setSoLinhKien(int soLinhKien) {
		this.soLinhKien = soLinhKien;
	}

	public int getSoLuong() {
		return this.soLuong;
	}

	public void setSoLuong(int soLuong) {
		this.soLuong = soLuong;
	}

	public String getTen() {
		return this.ten;
	}

	public void setTen(String tenSanPham) {
		this.ten = tenSanPham;
	}

	public int getTinhTrang() {
		return this.tinhTrang;
	}

	public void setTinhTrang(int tinhTrang) {
		this.tinhTrang = tinhTrang;
	}

	@Override
	public Class<SanPham> getEntityClass() {
		return SanPham.class;
	}

}