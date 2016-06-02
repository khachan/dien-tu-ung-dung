package com.spring.mvc.man.hoang.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


/**
 * The persistent class for the danh_muc database table.
 * 
 */
@Entity
@Table(name="danh_muc")
public class DanhMuc extends MyEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ma_danh_muc", unique=true, nullable=false)
	private Long maSo;

	@Column(name="chuc_nang")
	private String chucNang;

	@Lob
	@Column(name="mo_ta")
	private String moTa;

	@Column(name="so_linh_kien")
	private int soLinhKien;

	@Column(name="ten_danh_muc")
	private String ten;

	public DanhMuc() {
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

	public String getMoTa() {
		return this.moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}

	public int getSoLinhKien() {
		return this.soLinhKien;
	}

	public void setSoLinhKien(int soLinhKien) {
		this.soLinhKien = soLinhKien;
	}

	public String getTen() {
		return this.ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	@Override
	public Class<DanhMuc> getEntityClass() {
		return DanhMuc.class;
	}

    @Override
    public Serializable getId() {
       return maSo;
    }

}