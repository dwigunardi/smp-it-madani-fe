import React from 'react'

function FormatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR" }).format(number);
}

export default FormatRupiah