module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program(path) {
        let hasJSX = false;
        let hasImportUseLang = false;
        let hasImportI18n = false;

        // 遍历 import，检查是否导入 useLang 和 i18n
        path.traverse({
          ImportDeclaration(importPath) {
            if (importPath.node.source.value === '@global') {
              if (
                importPath.node.specifiers.some(
                  s => s.imported && s.imported.name === 'useLang'
                )
              ) {
                hasImportUseLang = true;
              }
            }
            if (importPath.node.source.value === '@i18n') {
              hasImportI18n = true;
            }
          },
          JSXElement() {
            hasJSX = true;
          }
        });

        if (!hasJSX) return; // 如果文件没有 JSX，不做任何处理

        // 插入 import { useLang } from './global'
        if (!hasImportUseLang) {
          path.node.body.unshift(
            t.importDeclaration(
              [t.importSpecifier(t.identifier('useLang'), t.identifier('useLang'))],
              t.stringLiteral('@global')
            )
          );
        }

        // 插入 import i18n from './i18n'
        if (!hasImportI18n) {
          path.node.body.unshift(
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier('i18n'))],
              t.stringLiteral('@i18n')
            )
          );
        }
      },

      // 包裹 JSX 中文文本
      JSXText(path) {
        const text = path.node.value.trim();
        if (text && /[\u4e00-\u9fa5]/.test(text)) {
          path.replaceWith(
            t.jsxExpressionContainer(
              t.callExpression(
                t.memberExpression(t.identifier('i18n'), t.identifier('t')),
                [t.stringLiteral(text)]
              )
            )
          );
        }
      },

      // 包裹 JSX 属性中的中文
      JSXAttribute(path) {
        const valueNode = path.node.value;
        if (
          valueNode &&
          valueNode.type === 'StringLiteral' &&
          /[\u4e00-\u9fa5]/.test(valueNode.value)
        ) {
          path.node.value = t.jsxExpressionContainer(
            t.callExpression(
              t.memberExpression(t.identifier('i18n'), t.identifier('t')),
              [t.stringLiteral(valueNode.value)]
            )
          );
        }
      },

      // 处理 JSX 表达式容器中的变量
      JSXExpressionContainer(path) {
        const expression = path.node.expression;
        
        // 如果已经是 i18n.t() 调用，跳过处理
        if (expression.type === 'CallExpression' && 
            expression.callee.type === 'MemberExpression' &&
            expression.callee.object.name === 'i18n' &&
            expression.callee.property.name === 't') {
          return;
        }
        
        // 处理标识符（变量）
        if (expression.type === 'Identifier') {
          // 检查变量是否在作用域中定义
          const binding = path.scope.getBinding(expression.name);
          if (binding) {
            // 检查变量的初始值是否包含中文
            const initValue = getVariableInitValue(binding.path);
            if (initValue && /[\u4e00-\u9fa5]/.test(initValue)) {
              path.replaceWith(
                t.jsxExpressionContainer(
                  t.callExpression(
                    t.memberExpression(t.identifier('i18n'), t.identifier('t')),
                    [t.identifier(expression.name)]
                  )
                )
              );
            }
          }
        }
        // 处理字符串字面量
        else if (expression.type === 'StringLiteral' && /[\u4e00-\u9fa5]/.test(expression.value)) {
          path.replaceWith(
            t.jsxExpressionContainer(
              t.callExpression(
                t.memberExpression(t.identifier('i18n'), t.identifier('t')),
                [t.stringLiteral(expression.value)]
              )
            )
          );
        }
      },

      // 函数组件插入 useLang()
      FunctionDeclaration(path) {
        if (isReactComponent(path.node) && hasJSXInFunction(path.node)) {
          injectUseLangInside(path, t);
        }
      },
      ArrowFunctionExpression(path) {
        if (
          path.parent.type === 'VariableDeclarator' &&
          path.parent.id.type === 'Identifier' &&
          /^[A-Z]/.test(path.parent.id.name) &&
          hasJSXInFunction(path.node)
        ) {
          injectUseLangInside(path, t);
        }
      }
    }
  };
};

// 判断 React 组件（首字母大写）
function isReactComponent(node) {
  return node.id && /^[A-Z]/.test(node.id.name);
}

// 检查函数体是否有 JSX
function hasJSXInFunction(node) {
  return (
    node.body &&
    node.body.type === 'BlockStatement' &&
    node.body.body.some(stmt => JSON.stringify(stmt).includes('JSXElement'))
  );
}

// 获取变量的初始值
function getVariableInitValue(bindingPath) {
  if (bindingPath.node && bindingPath.node.init) {
    const init = bindingPath.node.init;
    if (init.type === 'StringLiteral') {
      return init.value;
    } else if (init.type === 'CallExpression' && 
               init.callee.type === 'Identifier' && 
               init.callee.name === 'useState' &&
               init.arguments.length > 0 &&
               init.arguments[0].type === 'StringLiteral') {
      return init.arguments[0].value;
    }
  }
  return null;
}

// 插入 useLang()
function injectUseLangInside(path, t) {
  if (path.node.body && path.node.body.body) {
    // 检查当前作用域是否已声明 lang
    const hasLangVar = path.scope.hasBinding('lang');

    if (!hasLangVar) {
      path.node.body.body.unshift(
        t.variableDeclaration('const', [
          t.variableDeclarator(
            t.identifier('lang'),
            t.callExpression(t.identifier('useLang'), [])
          )
        ])
      );
    }
  }
} 