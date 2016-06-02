package com.spring.mvc.man.hoang.entities;

import java.io.Serializable;
import java.math.BigInteger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * The persistent class for the linh_kien database table.
 * 
 */
@Entity
@Table(name = "linh_kien")
public class LinhKien extends MyEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_linh_kien", unique = true, nullable = false)
    private Long maSo;

    @Column(name = "chuc_nang")
    private String chucNang;

    @Column(name = "do_lon")
    private double doLon;

    @Column(name = "don_vi_tinh")
    private String donViTinh;

    private double gia;

    private String loai;

    @Column(name = "ma_danh_muc")
    private BigInteger maDanhMuc;

    @Lob
    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "nha_san_xuat")
    private String nhaSanXuat;

    @Column(name = "so_luong")
    private double soLuong;

    @Column(name = "ten_linh_kien")
    private String ten;

    @Column(name = "tinh_trang")
    private int tinhTrang;

    @Column(name = "vi_tri")
    private String viTri;

    public LinhKien() {
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

    public double getDoLon() {
        return this.doLon;
    }

    public void setDoLon(double doLon) {
        this.doLon = doLon;
    }

    public String getDonViTinh() {
        return this.donViTinh;
    }

    public void setDonViTinh(String donViTinh) {
        this.donViTinh = donViTinh;
    }

    public double getGia() {
        return this.gia;
    }

    public void setGia(double gia) {
        this.gia = gia;
    }

    public String getLoai() {
        return this.loai;
    }

    public void setLoai(String loai) {
        this.loai = loai;
    }

    public BigInteger getMaDanhMuc() {
        return this.maDanhMuc;
    }

    public void setMaDanhMuc(BigInteger maDanhMuc) {
        this.maDanhMuc = maDanhMuc;
    }

    public String getMoTa() {
        return this.moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getNhaSanXuat() {
        return this.nhaSanXuat;
    }

    public void setNhaSanXuat(String nhaSanXuat) {
        this.nhaSanXuat = nhaSanXuat;
    }

    public double getSoLuong() {
        return this.soLuong;
    }

    public void setSoLuong(double soLuong) {
        this.soLuong = soLuong;
    }

    public String getTen() {
        return this.ten;
    }

    public void setTen(String tenLinhKien) {
        this.ten = tenLinhKien;
    }

    public int getTinhTrang() {
        return this.tinhTrang;
    }

    public void setTinhTrang(int tinhTrang) {
        this.tinhTrang = tinhTrang;
    }

    public String getViTri() {
        return this.viTri;
    }

    public void setViTri(String viTri) {
        this.viTri = viTri;
    }

    @Override
    public Class<LinhKien> getEntityClass() {
        return LinhKien.class;
    }

    @Override
    public Serializable getId() {
        return maSo;
    }
}