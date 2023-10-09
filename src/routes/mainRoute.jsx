import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import MainLayout from "../components/dashboard/layout/mainLayout";
import MainLanding from "../components/landing/layout/mainLanding";
import LoginPage from "../pages/auth/login";
import HomeDashboard from "../pages/dashboard/home";
import FetchWithZustand from "../pages/fetchWithZustand";
import LandingHome from "../pages/landing/home";
import PersistExample from "../pages/persistExample";
import { ProtectedRoute } from "./protectedRoute";
import PageLoader from "../components/reusable/pageLoader";
import DashboardBerita from "../pages/dashboard/berita";
import { useAuthPersist } from "../store/authPersist";
import NotFound from "../components/reusable/notFound";
import Penerimaan from "../pages/dashboard/penerimaan";
import BeritaDetail from "../pages/dashboard/berita_detail";
import DataSiswa from "../pages/dashboard/dataSiswa";
import DataSiswaTambah from "../pages/dashboard/dataSiswaTambah";
import Rekapitulasi from "../pages/dashboard/rekapitulasi";
import Tagihan from "../pages/dashboard/tagihan";
import TagihanTambah from "../pages/dashboard/tagihanTambah";
import BeritaList from "../pages/landing/beritaList";
import FooterLanding from "../components/landing/layout/footer";
import LandingDetailBerita from "../pages/landing/beritaDetail";
import ScrollToTop from "../components/reusable/scrollToTop";
import Belanja from "../pages/dashboard/belanja";
import BelanjaTambah from "../pages/dashboard/belanjaTambah";
import TagihanSiswa from "../pages/siswa/tagihan";
import RekapitulasiSiswa from "../pages/siswa/rekapitulasiSiswa";
import PenerimaanTambah from "../pages/dashboard/penerimaanTambah";
import RekapitulasiDetail from "../pages/dashboard/rekapitulasiDetail";
import Transaksi from "../pages/siswa/transaksi";
import DashboardSiswa from "../pages/siswa/dashboard";
import BelanjaUpdate from "../pages/dashboard/belanjaUpdate";
import BelanjaDetail from "../pages/dashboard/belanjaDetail";

function mainRoute() {
  const { isAuthenticated } = useAuthPersist();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLanding>
            <LandingHome />
          </MainLanding>
        }
      />
      <Route
        path="/home"
        // element={
        //   <MainLanding>
        //     <BeritaList />
        //   </MainLanding>
        // }
      >
        <Route
          path="/home/berita"
          element={
            <MainLanding>
              <ScrollToTop />
              <BeritaList />
            </MainLanding>
          }
        />
        <Route
          path="/home/berita/:beritaId"
          element={
            <div>
              <ScrollToTop />
              <LandingDetailBerita />
              <FooterLanding />
            </div>
          }
        ></Route>
      </Route>
      {/* <Route path="/persist" element={<PersistExample />} />
      <Route path="/fetchWithZustand" element={<FetchWithZustand />} /> */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="siswa">
        <Route
          path="/siswa/dashboard/:siswaId"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <DashboardSiswa />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/siswa/dashboard/tagihan/:siswaId"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <TagihanSiswa />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/siswa/dashboard/rekapitulasi/:siswaId"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <RekapitulasiSiswa />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="dashboard"
        // element={
        //   <ProtectedRoute>
        //     <React.Suspense fallback={<PageLoader />}>
        //       <MainLayout>
        //         <HomeDashboard />
        //       </MainLayout>
        //     </React.Suspense>{" "}
        //   </ProtectedRoute>
        // }
      >
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <HomeDashboard />
                </MainLayout>
              </React.Suspense>{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/berita"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <DashboardBerita />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/berita/:beritaId"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <ScrollToTop />
                  <BeritaDetail />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/keuangan/penerimaan"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <Penerimaan />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/keuangan/penerimaan/tambah"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <PenerimaanTambah />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/data_siswa"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <DataSiswa />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/data_siswa/tambah"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <DataSiswaTambah />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/keuangan/belanja"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <Belanja />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/keuangan/belanja/update/:belanjaId"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <BelanjaUpdate />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/keuangan/belanja/detail/:belanjaId"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <BelanjaDetail />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/keuangan/belanja/tambah"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <BelanjaTambah />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/keuangan/rekapitulasi"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <Rekapitulasi />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/keuangan/rekapitulasi/:name"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <RekapitulasiDetail />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/keuangan/tagihan"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <Tagihan />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/keuangan/tagihan/tambah"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <MainLayout>
                  <TagihanTambah />
                </MainLayout>
              </React.Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/transaksi" element={<Transaksi />} />
    </Routes>
  );
}

export default mainRoute;
