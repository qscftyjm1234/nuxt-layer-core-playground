const fs = require('fs')
const path = require('path')

const COURSE_DIR = path.resolve(__dirname, '../docs/course')
const MAX_LESSON = 19
const MIN_LESSON = 3

// Chinese Number Map
const cnMap = {
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十',
  11: '十一',
  12: '十二',
  13: '十三',
  14: '十四',
  15: '十五',
  16: '十六',
  17: '十七',
  18: '十八',
  19: '十九',
  20: '二十'
}

function reindex() {
  console.log('Starting re-indexing...')

  // 1. Rename files (Backwards to avoid collisions)
  for (let i = MAX_LESSON; i >= MIN_LESSON; i--) {
    const oldFile = path.join(COURSE_DIR, `lesson-${i}.md`)
    const newFile = path.join(COURSE_DIR, `lesson-${i + 1}.md`)

    if (fs.existsSync(oldFile)) {
      console.log(`Renaming lesson-${i}.md -> lesson-${i + 1}.md`)
      fs.renameSync(oldFile, newFile)
    }
  }

  // 2. Update Content
  for (let i = MAX_LESSON + 1; i >= MIN_LESSON + 1; i--) {
    const filePath = path.join(COURSE_DIR, `lesson-${i}.md`)
    if (!fs.existsSync(filePath)) continue

    let content = fs.readFileSync(filePath, 'utf-8')

    // Update Title: # 第N課 -> # 第(N+1)課
    // Since we already renamed N to N+1, the *content* still says N.
    // We need to change N to N+1 (which is i).
    // Wait, the file is now `lesson-i.md`. The content says `lesson-(i-1)`.
    const contentNum = i - 1
    const newNum = i

    const oldCn = cnMap[contentNum]
    const newCn = cnMap[newNum]

    if (oldCn && newCn) {
      const titleRegex = new RegExp(`# 第${oldCn}課`)
      content = content.replace(titleRegex, `# 第${newCn}課`)
    }

    // Update Links: lesson-X.md
    // If X >= 3, X becomes X+1.
    // But be careful not to double replace.
    // We can use a replacer function.
    content = content.replace(/lesson-(\d+)\.md/g, (match, n) => {
      const num = parseInt(n, 10)
      if (num >= 3) {
        return `lesson-${num + 1}.md`
      }
      return match
    })

    // Special Fix: Old Lesson 3 (Now Lesson 4)
    // Its previous link pointed to lesson-2.md (kept as lesson-2.md).
    // But functionally, Lesson 4's previous lesson should be the NEW Lesson 3.
    // So if this is lesson-4.md, change "lesson-2.md" to "lesson-3.md" in the "Previous" link context if appropriate.
    // But strictly speaking, the content text might still say "Previous: Building Components".
    // The script can't fix the text/semantic context perfectly.
    // I will handle the lesson-4 prev link update manually to be safe.
    // The above regex replacement handled N>=3. So lesson-2.md was ignored.
    // That means Lesson 4 still links to Lesson 2. This is safe for now, I will fix manually.

    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`Updated content in lesson-${i}.md`)
  }

  console.log('Re-indexing complete.')
}

reindex()
