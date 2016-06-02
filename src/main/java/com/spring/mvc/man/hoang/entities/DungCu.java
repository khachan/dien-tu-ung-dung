package com.spring.mvc.man.hoang.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


/**
 * The persistent class for the dung_cu database table.
 * 
 */
@Entity
@Table(name="dung_cu")
public class DungCu extends MyEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ma_dung_cu", unique=true, nullable=false)
	private Long maSo;

	@Column(name="chuc_nang")
	private String chucNang;

	@Column(name="hinh_anh")
	private String hinhAnh;

	@Column(name="kich_co")
	private String kichCo;

	@Lob
	@Column(name="mo_ta")
	private String moTa;

	@Column(name="so_luong")
	private int soLuong;

	@Column(name="ten_dung_cu")
	private String ten;

	@Column(name="vi_tri")
	private String viTri;

	public DungCu() {
	}

	public Long getMaSo() {
		return this.maSo;
	}

	public void setMaSo(Long maSo) {
		this.maSo = maSo;
	}

	public String getChucNang() {
		return this.chucNang;
	}

	public void setChucNang(String chucNang) {
		this.chucNang = chucNang;
	}

	public String getHinhAnh() {
		return this.hinhAnh;
	}

	public void setHinhAnh(String hinhAnh) {
		this.hinhAnh = hinhAnh;
	}

	public String getKichCo() {
		return this.kichCo;
	}

	public void setKichCo(String kichCo) {
		this.kichCo = kichCo;
	}

	public String getMoTa() {
		return this.moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
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

	public void setTen(String ten) {
		this.ten = ten;
	}

	public String getViTri() {
		return this.viTri;
	}

	public void setViTri(String viTri) {
		this.viTri = viTri;
	}

	@Override
	public Class<DungCu> getEntityClass() {
		return DungCu.class;
	}

}