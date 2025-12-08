# حروف مع عزيز - رمضان 2026

## 📋 Project Description

A modern, responsive web form for collecting Arabic language questions and answers for the YouTube channel "حروف مع عزيز" (Letters with Aziz). This project helps the content creator gather community contributions for their Arabic letter-based competition series during Ramadan 2026.

## ✨ Features

- **Modern UI Design**: Beautiful, gradient-based design with Ramadan 2026 theme
- **RTL Support**: Fully optimized for Arabic (Right-to-Left) layout
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dynamic Question Forms**: Add multiple questions with validation
- **Custom Dropdowns**: Styled select elements with custom arrows
- **Form Validation**: Real-time validation with modern popup notifications
- **Multiple Categories**: Support for 24+ different question categories
- **Arabic Letters**: All 28 Arabic letters available for selection
- **🛡️ Anti-Spam Protection**: Google reCAPTCHA v3 + 24-hour rate limiting
- **Spam Detection**: Automatically blocks users who submit too frequently

## 🎨 Design Features

- **Color Palette**:
  - Purple: `#70429e`
  - Red: `#e43b40`
  - Cyan: `#47b7cb`
  - Yellow: `#f8dc19`
  - Dark Purple: `#482f6d`

- **Modern UI Elements**:
  - Gradient backgrounds
  - Smooth animations
  - Custom scrollbars
  - Floating decorative elements
  - Star and crescent moon decorations

## 📁 Project Structure

```
aziz-horof/
├── index.html          # Main HTML file
├── banner-desktop.png  # Desktop banner image
├── banner-mobile.png  # Mobile banner image
├── logo.png           # Logo image
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - works as a static HTML file

### Installation

1. Clone or download this repository
2. Ensure all image files are in the same directory:
   - `banner-desktop.png`
   - `banner-mobile.png`
   - `logo.png`
3. Open `index.html` in your web browser

### Usage

1. **Fill Basic Information**:
   - Enter your name (required)
   - Enter your X (Twitter) account (optional)

2. **Add Questions**:
   - Select a category (مجال السؤال)
   - Enter the question (السؤال)
   - Choose the starting letter (الحرف)
   - Enter the answer (الاجابة)
   - Click "إضافة سؤال آخر" to add more questions

3. **Submit**:
   - Click "إرسال المساعدة" to submit all questions
   - A thank you popup will appear

## 📝 Form Fields

### Required Fields
- **الاسم** (Name): User's name
- **مجال السؤال** (Question Category): One of 24+ categories
- **السؤال** (Question): The question text
- **الحرف** (Letter): Starting Arabic letter
- **الاجابة** (Answer): The answer to the question

### Optional Fields
- **حسابك في X** (Your X Account): Twitter/X username

## 🎯 Question Categories

The form supports the following categories:
- رياضة (Sports)
- ثقافة (Culture)
- فن (Art)
- تاريخ (History)
- جغرافيا (Geography)
- دين (Religion)
- الغاز (Riddles)
- اللغة العربية (Arabic Language)
- ادب و شعر (Literature and Poetry)
- امثال (Proverbs)
- طب (Medicine)
- علوم (Sciences)
- قران (Quran)
- شخصيات مشهورة عربية (Famous Arabic Personalities)
- معلومات عامة (General Information)
- السعودية (Saudi Arabia)
- وطنية (National)
- تاريخ اسلامي (Islamic History)
- الانبياء و الصحابة (Prophets and Companions)
- عواصم ودول (Capitals and Countries)
- السيارات (Cars)
- الطبيعة (Nature)
- التقنية (Technology)

## 🔧 Technologies Used

- **HTML5**: Structure
- **Tailwind CSS**: Styling via CDN
- **JavaScript**: Form logic and validation
- **Google Fonts**: Cairo font for Arabic text

## 📱 Responsive Design

- **Mobile**: Optimized for screens < 768px
- **Desktop**: Optimized for screens ≥ 768px
- **Banner**: Different images for mobile and desktop
- **Layout**: Responsive grid system

## 🎨 Custom Features

### Custom Dropdown Styling
- Custom SVG arrows
- Hover effects
- Focus states
- RTL-optimized positioning

### Validation System
- Real-time form validation
- Modern popup notifications
- Visual feedback for incomplete fields
- Prevents adding new questions until current one is complete

### Animations
- Floating logo
- Twinkling stars
- Smooth transitions
- Hover effects

## 📊 Data Structure

When submitted, the form collects data in the following format:

```javascript
{
  name: "User Name",
  competitionX: "x_account",
  questions: [
    {
      category: "رياضة",
      question: "What do football players play with?",
      letter: "ك",
      answer: "كرة"
    },
    // ... more questions
  ]
}
```

## 🔮 Future Enhancements

- Backend integration for data storage
- Excel export functionality for admin
- Database connection
- User authentication
- Question management dashboard

## 📄 License

This project is created for "حروف مع عزيز" YouTube channel.

## 💾 Data Storage Options

The form is ready to save submissions. Choose one of these options:

### Option 1: Google Sheets (Recommended - Easiest)
- ✅ No backend needed
- ✅ Free
- ✅ View data directly in Google Sheets
- ✅ Export to Excel anytime

**Setup**: See `GOOGLE_SHEETS_SETUP.md` for detailed instructions.

### Option 2: Vercel Serverless Functions
- ✅ Better security
- ✅ More control
- ✅ Still free on Vercel

**Setup**: See `VERCEL_SETUP.md` for detailed instructions.

### Quick Setup (Google Sheets):
1. Create a Google Sheet
2. Set up Google Apps Script (see `google-apps-script.js`)
3. Deploy as Web App
4. Copy the Web App URL
5. Paste it in `index.html` at `GOOGLE_SCRIPT_URL`

## 🛡️ Security & Anti-Spam

The form includes built-in spam protection:

### Features:
- **Google reCAPTCHA v3**: Invisible CAPTCHA verification
- **Rate Limiting**: Maximum 5 submissions per hour
- **24-Hour Block**: Automatically blocks spammers for 24 hours
- **Spam Detection**: Detects rapid automated submissions (minimum 30 seconds between submissions)

### Setup:
See `CAPTCHA_SETUP.md` for detailed instructions on:
- Getting reCAPTCHA keys
- Configuring CAPTCHA verification
- Adjusting rate limit settings

### Default Settings:
- Max submissions: **5 per hour**
- Block duration: **24 hours**
- Minimum time between submissions: **30 seconds**

## 👨‍💻 Development Notes

- All text is in Arabic (RTL)
- Form validation is client-side only
- Data storage is configurable (Google Sheets or Vercel Functions)
- Images should be optimized for web use

## 🐛 Known Issues

None at the moment. Please report any issues you encounter.

## 📞 Support

For questions or support, please contact the project maintainer.

---

**Made with ❤️ for رمضان 2026**

