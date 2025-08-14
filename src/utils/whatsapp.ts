export function sendToWhatsApp(cartItems: any[], totalPrice: number) {
  const phoneNumber = '5354690878';
  
  let message = '🎬 *PEDIDO DE ENTRETENIMIENTO*\n';
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
  
  // Agrupar por tipo
  const movies = cartItems.filter(item => item.type === 'movie' && !isAnime(item));
  const series = cartItems.filter(item => item.type === 'tv' && !isAnime(item));
  const anime = cartItems.filter(item => isAnime(item));
  
  let subtotal = 0;
  
  if (movies.length > 0) {
    message += '🎬 *PELÍCULAS*\n';
    movies.forEach((item, index) => {
      const year = item.release_date || item.first_air_date;
      const displayYear = year ? new Date(year).getFullYear() : 'N/A';
      const rating = item.vote_average ? `⭐ ${item.vote_average.toFixed(1)}` : '';
      const price = item.price || 80;
      subtotal += price;
      
      message += `${index + 1}. *${item.title}*\n`;
      message += `   📅 Año: ${displayYear}\n`;
      if (rating) message += `   ${rating}\n`;
      message += `   💰 Precio: $${price.toLocaleString()} CUP\n\n`;
    });
  }
  
  if (series.length > 0) {
    message += '📺 *SERIES*\n';
    series.forEach((item, index) => {
      const year = item.release_date || item.first_air_date;
      const displayYear = year ? new Date(year).getFullYear() : 'N/A';
      const rating = item.vote_average ? `⭐ ${item.vote_average.toFixed(1)}` : '';
      const seasons = item.selectedSeasons?.length || 1;
      const price = seasons * 300;
      subtotal += price;
      
      message += `${index + 1}. *${item.title}*\n`;
      message += `   📅 Año: ${displayYear}\n`;
      if (rating) message += `   ${rating}\n`;
      message += `   🎬 Temporadas: ${seasons}\n`;
      message += `   💰 Precio: $${price.toLocaleString()} CUP ($300 CUP/temp.)\n\n`;
    });
  }
  
  if (anime.length > 0) {
    message += '🎌 *ANIME*\n';
    anime.forEach((item, index) => {
      const year = item.release_date || item.first_air_date;
      const displayYear = year ? new Date(year).getFullYear() : 'N/A';
      const rating = item.vote_average ? `⭐ ${item.vote_average.toFixed(1)}` : '';
      let price = 80; // Por defecto para películas anime
      
      if (item.type === 'tv') {
        const seasons = item.selectedSeasons?.length || 1;
        price = seasons * 300;
        message += `${index + 1}. *${item.title}*\n`;
        message += `   📅 Año: ${displayYear}\n`;
        if (rating) message += `   ${rating}\n`;
        message += `   🎬 Temporadas: ${seasons}\n`;
        message += `   💰 Precio: $${price.toLocaleString()} CUP ($300 CUP/temp.)\n\n`;
      } else {
        message += `${index + 1}. *${item.title}*\n`;
        message += `   📅 Año: ${displayYear}\n`;
        if (rating) message += `   ${rating}\n`;
        message += `   💰 Precio: $${price.toLocaleString()} CUP\n\n`;
      }
      
      subtotal += price;
    });
  }
  
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  message += '📊 *RESUMEN DEL PEDIDO*\n\n';
  
  if (movies.length > 0) message += `🎬 Películas: ${movies.length} × $80 CUP = $${(movies.length * 80).toLocaleString()} CUP\n`;
  if (series.length > 0) {
    const totalSeasons = series.reduce((acc, item) => acc + (item.selectedSeasons?.length || 1), 0);
    message += `📺 Series: ${totalSeasons} temporadas × $300 CUP = $${(totalSeasons * 300).toLocaleString()} CUP\n`;
  }
  if (anime.length > 0) {
    const animeMovies = anime.filter(item => item.type === 'movie').length;
    const animeSeries = anime.filter(item => item.type === 'tv');
    const animeSeasons = animeSeries.reduce((acc, item) => acc + (item.selectedSeasons?.length || 1), 0);
    
    if (animeMovies > 0) message += `🎌 Películas Anime: ${animeMovies} × $80 CUP = $${(animeMovies * 80).toLocaleString()} CUP\n`;
    if (animeSeasons > 0) message += `🎌 Series Anime: ${animeSeasons} temporadas × $300 CUP = $${(animeSeasons * 300).toLocaleString()} CUP\n`;
  }
  
  message += `\n💰 *TOTAL: $${totalPrice.toLocaleString()} CUP*\n`;
  message += `📦 *Total de elementos: ${cartItems.length}*\n\n`;
  
  message += '🙏 ¡Gracias por tu pedido!\n';
  message += '📱 Nos pondremos en contacto contigo pronto.';
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(whatsappURL, '_blank');
}

function isAnime(item: any): boolean {
  return item.original_language === 'ja' || 
         (item.genre_ids && item.genre_ids.includes(16)) ||
         item.title?.toLowerCase().includes('anime');
}
  cartItems.forEach((item, index) => {
    const year = item.release_date || item.first_air_date;
    const displayYear = year ? new Date(year).getFullYear() : 'N/A';
    const rating = item.vote_average ? `⭐ ${item.vote_average.toFixed(1)}` : '';
    const type = item.type === 'movie' ? '🎬' : '📺';
    
    message += `${index + 1}. ${type} *${item.title}*\n`;
    message += `   Año: ${displayYear}\n`;
    if (rating) message += `   ${rating}\n`;
    message += '\n';
  });
  
  message += `📦 *Total de elementos:* ${cartItems.length}\n\n`;
  message += '¡Gracias por tu pedido! 🙏';
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(whatsappURL, '_blank');
}