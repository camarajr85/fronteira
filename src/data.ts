/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Order, ApprovalRequest } from './types';

export const mockProducts: Product[] = [
  // iPhone 15 Pro Max (Product detail flag)
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max Apple (256GB) Titanium Blue, Tela 6.7", Câmera 48MP',
    category: 'Eletrônicos',
    price: 6890,
    rating: 4.8,
    reviewsCount: 124,
    store: 'Mega Eletrônicos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq0lrJBfoRVawZvNB2iJR00n2bcKrj5HFQwfJRKPcyS-kFZa55363BZRCaD8vJhbuaDu1uK41ccfVTvtBD2fQf2AunbOf4GfhlIXH8_T10IQEPesb8hjjhmxCmMKVo_D0_0QbUdw1spXRVLU26kKCSmwEVbkIq0DuSt8Ka0u6ljjPrnVFdlHPLRnAcr8nS_VQM0P7w_WyLDqygEIzLb0H19-w8ivRsMBYYNAuXqztb465GtVNJA5LgvEbVK8IYCzfXBFQgIdcyDSc',
    description: 'O processador A17 Pro é um salto monumental para o desempenho gráfico. Jogos de celular ficam mais imersivos, com ambientes incrivelmente detalhados e personagens realistas.',
    inStock: true,
    stockCount: 14,
    colors: ['#4B5267', '#F2F1ED', '#2F2F30', '#7A7D7E'],
    capacities: ['256GB', '512GB', '1TB'],
    specs: {
      'Chipset': 'A17 Pro',
      'CPU': '6-Core (2 performance + 4 efiência)',
      'GPU': '6-Core de última geração',
      'RAM': '8GB LPDDR5X',
      'Material': 'Estrutura em Titânio Aeroespacial',
      'Tela': 'OLED Super Retina XDR de 6.7"',
      'Resistência': 'Classificação IP68 (até 6m por 30min)',
    }
  },
  // Featured Products (From Homepage Screen 1)
  {
    id: 'smartphone-flagship',
    name: 'Smartphone Flagship 256GB - Titanium Gray',
    category: 'Eletrônicos',
    price: 4299,
    oldPrice: 5100,
    rating: 4.6,
    reviewsCount: 54,
    store: 'CellShop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3r9tBFX935PaiQ3yd8qKqtguTTV4UE0X5dEiFn18e4_5x0ZLEpN2EgYpPjS5ngayfv5qk8EfYZ1tzYBAZO7ArmCFC7SBtp4rNH4ZbdhG_hAj01x9CkhJ0HCFfzNs-7cACrwtrsgf89K_hX9I3OqTex87E4e8-GB96jvtkkV1fl1jTUmwnXEWV9Ct_ZX1AvlEL20dMva4VmT07zt2a-ObbxGmDa6IuXGkeN2Mf0slImDZOLfnyX-bkAfTLusgZt1wNDLE0B4iLP0A',
    description: 'Aproveite o maior desempenho em fotografia móvel com o sensor principal avançado de 200MP e zoom óptico híbrido. Perfeito para criadores de conteúdos e profissionais exigentes.',
    inStock: true,
    stockCount: 8,
    isOffer: true,
    offerTag: 'Destaque'
  },
  {
    id: 'smartwatch-pro-gen5',
    name: 'Smartwatch Pro Gen 5 - Black Silicone',
    category: 'Eletrônicos',
    price: 1850,
    rating: 4.5,
    reviewsCount: 32,
    store: 'Mega Eletrônicos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnHEejb-w1Bgy_wUatTK6qm9D7CfVzC6qQgiFht1RS4tvhftK18FqET3fKKmarap5H570xiYhhiekrh6tqjoNtwjc5KUAIHkqcwOxYIi_sKgsHYR3Qei3KTVBKIJw3k-5RzCoEGjuvQBEO97opQ4Pof5ckw-VSM6EaaQR7eWXU6eyvdafFUxwausdltygwZDRguQXLUl3ORekONffgBx9t2XcUab6quGTjR2Cie-qHxJotlaocYp8g9cH4d3u0BqRbqa2tOsS87Gc',
    description: 'Relógio inteligente de alta precisão com medição contínua de oxigênio no sangue, GPS integrado, bateria de longa duração para 14 dias e resistência a mergulhos até 50 metros.',
    inStock: true,
    stockCount: 12,
    isOffer: true,
    offerTag: 'À vista no PIX'
  },
  {
    id: 'headphone-noise-cancelling',
    name: 'Headphone Noise Cancelling Premium Wireless',
    category: 'Eletrônicos',
    price: 2150,
    oldPrice: 2600,
    rating: 4.9,
    reviewsCount: 81,
    store: 'Atacado Connect',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXrl20pfP0nGdIU-RGFncLDoEfyMIjo3ZfG3GSIXlqnG6tw7nCPJknoHdtje_bNnII_7RDirfCIbLSUFUAdCfkwHtTFR-dpUtB15w79h5Lh2J0DVKpwdYSOkohk_JJ6R1ISn6Qcy4-MvgV9pmi2w_1stK8nVNxmxGkoLoufBMyKtGHVxwqP2qgfNj-wmBn5z9NOcZpkZi9fAg6Hd-wI5QfqjLYM2UyKyBjzv-7U2l5J7jf18pZuiPXmXT5b1dWxh_vhE4NY1hbYH8',
    description: 'Cancelamento de ruído ativo inteligente de 45dB que se calibra ao ambiente de forma automática. Drivers de 40mm premium para áudio de alta fidelidade e até 50 horas de autonomia.',
    inStock: true,
    stockCount: 5,
    isOffer: true,
    offerTag: 'Mais Vendido'
  },
  {
    id: 'perfume-signature',
    name: 'Perfume Importado Signature Edition 100ml',
    category: 'Cosméticos',
    price: 580,
    rating: 4.7,
    reviewsCount: 42,
    store: 'CellShop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADO740zu-Tq9qpuqxF33Hca8HMcGyCZj3PBwnReosaXNSqf23AnuSa8BUNFB5Ln_wg3MRTe7Sh6I9vnxfKQKmDH4NVPwvykCzPoAYwOb4lCBSmhn5TGCoesuFZ9QpvO4ARjpuCwvZWO1sv3GueIGo1Vn-yVMure2FeFYQBlSm9jCjent3lh_m1OatqMoCh5DrDAbh2P0DzWUnkjrnD8UqV70DWt7zX5yA1gBbAcym03ZqcU66MwYty9pQr79XfxnM37bKCeCw3pcw',
    description: 'Fragrância marcante e de altíssima fixação que combina notas frescas de bergamota italiana com fundo amadeirado de sândalo e sementes de cacau. Original garantido de procedência.',
    inStock: true,
    stockCount: 22,
    isOffer: true,
    offerTag: 'Original Garantido'
  },
  // Search results variants (From Screen 5)
  {
    id: 'iphone-15-plus',
    name: 'Apple iPhone 15 Plus 128GB - Pastel Pink',
    category: 'Eletrônicos',
    price: 5899,
    rating: 4.7,
    reviewsCount: 76,
    store: 'CellShop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLnUBHyxYRnSEqnanWVv7H6rranLKYoyGjB5q6_J2xwjfJ35Nj_Ftc3T5LjJpHOuw5NO0ouZlnoWxlmaBi36qV41oIkBWrd3-H7BLWFPBz_m0yNLlvmlOjJqb5e5L2az-1T0thum1BtCM9edOT3oCeV5oGnR0yS7_mJzICtztKzXDe4qtSI5NwqA5adRLSXzsSy9-lWRy39Uc4laaVK6F00Hk7Il0pGfHX0EO0E0zMdGpMHyIVK5gXzPEjHByoD31v_lBq_oJuuBg',
    description: 'Tela ampliada de 6.7 e bateria de altíssima duração para quem precisa de produtividade máxima durante o dia todo sem carregar.',
    inStock: true,
    stockCount: 8
  },
  {
    id: 'combo-charger-magsafe',
    name: 'Combo Carregador MagSafe + Cabo USB-C Premium 2m',
    category: 'Eletrônicos',
    price: 499,
    oldPrice: 599,
    rating: 4.8,
    reviewsCount: 154,
    store: 'Atacado Connect',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoY-dP0qezBB9Hun8jkKZz3AzUSHSVY4bNHqUfQxW-fnafVFQwyPyipvGMPVliKYRh071WTgZhLl_S6MtrRFxE7i6azJ_G_7eimcHTKzG2I5eCYYCJDY8DWCL9RfmVe-48_35piOaZ1dD-8BiB6YZ3nv9F4xSfGPe1UT3l-wfMRNmf2VlZiLszQd3GH3VpCfP-nbZOnRRiUeKf5yondOfEzldZAHpMNkhLt-P4AhVCiSc0w2cFec0aXcHjotriGU1zp6UZtRgpxKI',
    description: 'Kit essencial de carregamento magnético rápido premium de 15W com cabo trançado reforçado de silicone de 2 metros para toda a linha iPhone 15.',
    inStock: true,
    stockCount: 42,
    isOffer: true,
    offerTag: '-15% OFF'
  },
  {
    id: 'iphone-15-yellow',
    name: 'Apple iPhone 15 128GB Yellow - Dynamic Island',
    category: 'Eletrônicos',
    price: 4999,
    rating: 4.6,
    reviewsCount: 39,
    store: 'CellShop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_RMbfYwQsWktP47k_9mb-Sm-d8NWqk3giPSXb-6waYWO7m_VwJ7i87KbQ2dfSyv_uNdOWaAzbCOcmDL1CehGoOofuWcbWK-DR8uhx8yr5uN9sd9NZsFu8LY-j_iI5gig04PKdkloN1pymERlghqxY8CmFwFTGCOBRby8l4U6Spd70tbzas4Sa4TSFdmB-G6p-JoUXASB-nXvZsH-g_UAknYq7ZSXQ6X0IZY-v6Ot0dzdm39Z5GdEaiuzBb1GLijvtcZ37HaISCmE',
    description: 'Design inovador com Dynamic Island, vidro traseiro colorido por infusão e câmera de 48MP para registrar cada história com cores espetaculares.',
    inStock: true,
    stockCount: 3
  }
];

export const mockOrders: Order[] = [
  // Order 1 (From Screen 2 Courier list / Screen 3 Admin list)
  {
    id: 'FR-8892',
    productName: 'Eletrônicos Premium',
    origin: 'Ciudad del Este (PY)',
    destination: 'São Paulo, SP (BR)',
    weight: 12.5,
    shippingFee: 450.00,
    totalValue: 7499.00,
    status: 'Pago',
    timeAgo: 'Há 2 min',
    buyerName: 'Pedro Cavalcanti',
    buyerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdByCjDLUO_HPHGFdx_f7SO_6Ch71qiNXi7lYD15TiFKRBC_IRsBTM2AzP0xQjLzFzIItX5OBQ5VqpU5EIcY68l3qV4iy2G2fdZdKyncqgy91V0gULO1JXMGIBJ9Vdr0uyRKSHM_kSaKlDpveoN0SNEtXQRgd3-DPugRFPqaALJK8rK14sU5bY11heaXI7q94m8PJ3WsLiOapZuHTQWg3JL03PATYxokSK84vftUkru3EowCqirPym7xs5mZrRETkGML7mVlQaJJ4',
    progressPercent: 12
  },
  // Order 2
  {
    id: 'FR-9011',
    productName: 'Confecções Têxteis',
    origin: 'Asunción (PY)',
    destination: 'Curitiba, PR (BR)',
    weight: 45.0,
    shippingFee: 890.00,
    totalValue: 1250.40,
    status: 'Aguardando Freteiro',
    timeAgo: 'Há 45 min',
    buyerName: 'Marina Bastos',
    buyerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOhKOiNKhbEuCqHLNKbe_S2a9lB_fzBXSK0fGkoaAIPIw0mBrRGVSz2e1wDCyvSGyezftwgMWnulinKjyLl16YPj98F0PGoOQWqgER3kFGGxPzPsBok5QDVfi9b1ugPpgry25dwQ2DItdUWdE1jSEw4co6fxsjF9SzUt8PHR1ng36osujIHNiN4HDxe_bo2dllxst1CO2_ShrckD2rC1lIwm8wzFckRqX8aUEUXI2HuWkQATP4b5hMam_OBXb-gYSslZDFYYdXfSc',
    progressPercent: 0
  },
  // Order 3
  {
    id: 'FR-7764',
    productName: 'Ferramentas Industriais',
    origin: 'Hernandarias (PY)',
    destination: 'Cascavel, PR (BR)',
    weight: 8.2,
    shippingFee: 215.00,
    totalValue: 650.00,
    status: 'Em Trânsito',
    timeAgo: '2h atrás',
    buyerName: 'Antônio Lemos',
    courierName: 'Tiago M.',
    courierImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLuUNwHEaVgCEbCBME0ZyULUs3dl8sd2IecJUgSss6kBmfSlVeVYBAlAJFv2QlDiBArGB3rxs3GUoeWASQV-Heq4CQbxK0IpLFiL4g7wtmgoEhEZxAZpjuZ7AKA_DPcns5DJRxfgn69PDQJGjy-_b3jWOvKCc33fvNUK7r3lBlOKFQTSI0d4Wc36CqUxaHXrQPwAO-q2Sl8joumSgpYE8SfBFPcDgwG4r7XvYHYbTlt5HD4iRLsB0wmLQO7z7WrgHgaiSmnABSYrc',
    progressPercent: 65
  }
];

export const mockApprovals: ApprovalRequest[] = [
  {
    id: 'app-01',
    name: 'Loja do Sol',
    type: 'LOJA',
    documentId: 'CNPJ: 12.345.678/0001-90',
    detail: 'Loja de Moda em Ciudad del Este',
    date: 'Hoje, 10:45',
    status: 'pending'
  },
  {
    id: 'app-02',
    name: 'Ricardo Silva',
    type: 'FRETEIRO',
    documentId: 'Moto (Py-Br) - CNH: 918231',
    detail: 'Gestão Logística Fronteira local',
    date: 'Ontem, 16:20',
    status: 'pending'
  },
  {
    id: 'app-03',
    name: 'Importados Mega',
    type: 'LOJA',
    documentId: 'CNPJ: 98.765.432/0001-21',
    detail: 'Distribuidor eletrônicos em CDE',
    date: '02 Mai, 11:30',
    status: 'pending'
  }
];

export const partnerStores = [
  { name: 'MEGA', tag: 'ELETRÔNICOS' },
  { name: 'CONNECT', tag: 'ATACADO' },
  { name: 'CELLSHOP', tag: 'IMPORTADOS' },
  { name: 'COLLECTIONS', tag: 'COLECIONÁVEIS' }
];

export const galleryThumbs = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBcadOWNjZesGaHx-UIZMZVPZigZMzHg9N-2BKAgboFeds4qZ06k9LNwdgTUpbZwFDVVkK0nywwq_tc5u5RKIT8_hUFadlhR-V4NRqtUYUps5X3gRKBkvgjsZCgYdOvNmYQ4_lGj22u7vMkWdRC3B2TpFspu9CrLovGYnveggIIR0pbaGK0zTAzQ-Spfn3Quf1YFWaMM_AKz9L0zRxNXykLssBcUslnqmr1rrR0BQuVqj1Ty9XoseTM5htuAxtwGgpZTg-c4_HcvoY',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBugIlfhFRjHu3Cb0gSuC7bsw0cPiYYRSk34w2TgS-l8BT9tPK2QVf8aGO6-l8z1mf2senN4pwvAgB2iwMZHFTM6LpTV9CpLcMaqKq3eNYeP3fZWGCwP00rYkOJjzP-2P7fzuRg0rS4HSgkRl_sl4gV_JqDnjxEdYhaT5-Pi40YWcfaZrVI4JFwTB8sobj9IDBasjfaAgkhPy45bwUHcAfatq96U9Z48yR1ST8tk-PSNpTpp7xbaBa1J21_uJwsIdXN191QtPkYwwc',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBiHphqyKbY9Msg6vdn9fMe8VdyGZ8OKzzSXZdQyuC9ft6hUz4usDQg8xjat7lhV8s06ZkDSrmFI8lNedJyX_VjLPKyabWiDMz9XLzfShBfiRivZEnq7xKkijSW7zBIMRw20jroxq3hBzCJ6JIXbgQXro_tOZonldQcDLtdLc1QXr8Lig8iUkWIQoFGx3g3ljt-GbEJsX2f8F5a54e8JBycNtwDl1s919BG8CGcOTr-lmyqktC6czLH9uaFHDyB-SyJEk-W0TrhKbc',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCDvP40N2Meg3EjczAR3ncxQWChWlLwS0EEajspDnBhB93g2aPl_hJ5kdgcIztyOpTU7mrWVbxX1grGsgXgfD5vEVv81QmG8qr7KjjzGbfDLMuHNz-bJnRS2CPFmf5lYnl052NgIGGDD5x4jUaUe2A-j3UA3o-frXIcOMSTkrFLRJHwV7R7e6zJ2hmkf43wsG_3OuPBPpX9PxotqtPI9B8qSNgy6fFDY8g3fCJERDb1lqCfMIVjabaLZICJFwK4e4HQ11BOXePAwXI'
];

export const phoneDetailsImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtw3Z-R_SvtnNI1-zHr87cZRqApw2jEPLKdSMBwwPHw8SJBAhrzPEbckVoMThLMx5PkO1JPRGA6_AsLeOJPjiPXcExkOnc5UWBoY5OcPA5Y1NoNSXQU2OwNIZB0ljuMpOyrs103QqVTwEEcXesSQOJ0b7QJHFSmC4N5v8wC27lrhC-N1xUf8_A-s5fBb9yVaFy_8YVaKUBuqoaSxt4EPdMt1XSQAoVvdtm6s7LbcjPrbBziKn467BfnkxqyKfhllyr38YrJ9KHc04';
export const courierAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC52coz2EeYc_eeAy4_KtHYIdy_wNHRUM_DaM28bjqixi0I66YqFrQe3v5NeuXofpWG2pO5_EqEXWGbs_j13LD3mYbgalQsAMHvkz9yaV0PljeJoHamkv5Hc7ZVYWtlNYG07mdOfDK4U1plNQLfBGCtnRccZvkbC-g_AmqjWeFAO4TBlIeRTC-5bkDCOAXEXDTbf3WFEBolgXIC9-fl8BmKCd1JEAGs-i7GNu1IgCcetEO5oZpuPL05BPkAmAhLyjl4hyFO7TKmxMg';
export const adminAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI10iVHaqhuwDyMCb9CWDmD9bIb0cGT4hqDWr6jVEO2cC-kyOMbRvdOuREmoheOmuWE7o3hUL-dGnWljU4w6Y2ZT0nnvVY3Q1Cw70r4XTyxy6rwgWI48wQtR9YkM-UTw28cF5VbXMYdLV1eecGB4kl1WLDJzwOJv6i3azON9_e01ILv7OklH0YpQ3pq-w5DvZ_jLECNRRzR0iZqQXBRncUlbD7rD1BUIwd1yRq3yyIWuXytNHd4yS_KuzvolaxMt0aSK-k5mQPOxU';
export const backgroundDeliveryVan = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDjCHy67zWPjLQIlxE5507KOCciLJVOIIk3jTbaD3XChYKW6FRErhxHLiisxytSuVLiOxBj-roK-ylxsyQ5gxUzZV0giCVNAlP-sJQPiSAuD1tjN9JaGDjWZ7xJwmhE6-qp3M47uuXkcqZNyt7aMxsDCWjRDjzpA0ZiNFzkIQ1VcloOkVsKbgTUrYwIV3gAzIzrg9D2896sEqx3g1u4LbiraOh3M2MVbbAEGRv7NNeamOYOx1zUXq1bpgn8hcr5oRMAjDFwlitG30';
