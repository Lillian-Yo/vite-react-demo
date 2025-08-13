const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// 存储提取到的中文文本
const extractedTexts = new Set();

// 递归遍历目录
function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

// 提取中文文本的函数
function extractChineseTexts(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 解析 JSX 文件
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx']
    });

    // 遍历 AST
    traverse(ast, {
      // 提取 JSX 文本中的中文
      JSXText(path) {
        const text = path.node.value.trim();
        if (text && /[\u4e00-\u9fa5]/.test(text)) {
          extractedTexts.add(text);
        }
      },

      // 提取 JSX 属性中的中文
      JSXAttribute(path) {
        const valueNode = path.node.value;
        if (
          valueNode &&
          valueNode.type === 'StringLiteral' &&
          /[\u4e00-\u9fa5]/.test(valueNode.value)
        ) {
          extractedTexts.add(valueNode.value);
        }
      },

      // 提取 JSX 表达式容器中的中文
      JSXExpressionContainer(path) {
        const expression = path.node.expression;
        
        // 处理字符串字面量
        if (expression.type === 'StringLiteral' && /[\u4e00-\u9fa5]/.test(expression.value)) {
          extractedTexts.add(expression.value);
        }
      },

      // 提取变量声明中的中文（useState 等）
      VariableDeclarator(path) {
        if (path.node.init) {
          const init = path.node.init;
          
          // 直接字符串赋值
          if (init.type === 'StringLiteral' && /[\u4e00-\u9fa5]/.test(init.value)) {
            extractedTexts.add(init.value);
          }
          
          // useState 中的中文
          if (init.type === 'CallExpression' && 
              init.callee.type === 'Identifier' && 
              init.callee.name === 'useState' &&
              init.arguments.length > 0 &&
              init.arguments[0].type === 'StringLiteral' &&
              /[\u4e00-\u9fa5]/.test(init.arguments[0].value)) {
            extractedTexts.add(init.arguments[0].value);
          }
        }
      },

      // 提取对象属性中的中文
      ObjectProperty(path) {
        if (path.node.value && 
            path.node.value.type === 'StringLiteral' && 
            /[\u4e00-\u9fa5]/.test(path.node.value.value)) {
          extractedTexts.add(path.node.value.value);
        }
      },

      // 提取数组元素中的中文
      ArrayExpression(path) {
        path.node.elements.forEach(element => {
          if (element && 
              element.type === 'StringLiteral' && 
              /[\u4e00-\u9fa5]/.test(element.value)) {
            extractedTexts.add(element.value);
          }
        });
      }
    });

  } catch (error) {
    console.warn(`解析文件 ${filePath} 时出错:`, error.message);
  }
}

// 生成 i18n 配置文件
function generateI18nConfig() {
  const texts = Array.from(extractedTexts).sort();
  
  const enTranslations = {};
  const zhTranslations = {};
  
  texts.forEach(text => {
    // 简单的英文翻译（这里可以根据需要改进）
    const enText = text
      .replace(/你好/g, 'Hello')
      .replace(/欢迎使用我的应用/g, 'Welcome to my app')
      .replace(/切换语言/g, 'Switch Language')
      .replace(/加载内容/g, 'Load Content')
      .replace(/加载中\.\.\./g, 'Loading...')
      .replace(/出错了/g, 'Error')
      .replace(/内容1/g, 'Content 1')
      .replace(/内容2/g, 'Content 2')
      .replace(/内容3/g, 'Content 3')
      .replace(/打开弹窗/g, 'Open Modal')
      .replace(/测试/g, 'Test')
      .replace(/按钮标题/g, 'Button Title')
      .replace(/点击按钮/g, 'Click Button')
      .replace(/测试文本/g, 'Test Text');
    
    enTranslations[text] = enText;
    zhTranslations[text] = text;
  });

  const i18nConfig = {
    resources: {
      en: {
        translation: enTranslations
      },
      'zh-cn': {
        translation: zhTranslations
      }
    }
  };

  return i18nConfig;
}

// 主函数
function main() {
  const srcDir = path.join(__dirname, 'src');
  
  console.log('开始扫描文件...');
  
  // 扫描所有 JSX 和 JS 文件
  walkDir(srcDir, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      console.log(`扫描文件: ${filePath}`);
      extractChineseTexts(filePath);
    }
  });

  console.log('\n提取到的中文文本:');
  const texts = Array.from(extractedTexts).sort();
  texts.forEach((text, index) => {
    console.log(`${index + 1}. "${text}"`);
  });

  console.log(`\n总共提取到 ${texts.length} 个中文文本`);

  // 生成 i18n 配置
  const i18nConfig = generateI18nConfig();
  
  // 保存到文件
  const outputPath = path.join(__dirname, 'extracted-i18n.json');
  fs.writeFileSync(outputPath, JSON.stringify(i18nConfig, null, 2), 'utf8');
  
  console.log(`\ni18n 配置已保存到: ${outputPath}`);
  
  // 生成更新后的 i18n.js 文件内容
  const i18nJsContent = `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh-cn',
    interpolation: {
      escapeValue: false,
    },
    resources: ${JSON.stringify(i18nConfig.resources, null, 4)},
  });

export default i18n;`;

  const i18nJsPath = path.join(__dirname, 'src', 'i18n-updated.js');
  fs.writeFileSync(i18nJsPath, i18nJsContent, 'utf8');
  
  console.log(`更新后的 i18n.js 文件已保存到: ${i18nJsPath}`);
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { extractChineseTexts, generateI18nConfig }; 