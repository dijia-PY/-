# 个人主页修改指南

## 如何修改个人信息

本个人主页使用 `config.json` 文件来存储所有个人信息，您只需要修改这个文件即可更新页面内容。

### 1. 修改基本信息

在 `config.json` 文件中找到 `basicInfo` 部分：

```json
"basicInfo": {
  "name": "张明",
  "avatar": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20developer%20portrait%20headshot&image_size=square",
  "status": "正在学习",
  "school": "北京大学",
  "college": "计算机学院",
  "major": "计算机科学与技术",
  "degree": "本科",
  "contact": {
    "email": "zhangming@example.com",
    "phone": "138-0000-0000",
    "wechat": "zhangming_wx"
  }
}
```

修改说明：
- `name`: 您的姓名
- `avatar`: 头像图片链接（可以使用本地图片路径或网络图片链接）
- `status`: 目前学习状态
- `school`: 学校名称
- `college`: 学院名称
- `major`: 专业名称
- `degree`: 目前学历
- `contact`: 联系方式
  - `email`: 邮箱地址
  - `phone`: 电话号码
  - `wechat`: 微信号

### 2. 修改轮盘内容

在 `config.json` 文件中找到 `wheelSections` 部分：

```json
"wheelSections": [
  {
    "title": "接口能力",
    "items": ["RESTful API", "GraphQL", "WebSocket", "gRPC"]
  },
  {
    "title": "技术能力",
    "items": ["Node.js", "React", "Python", "MongoDB"]
  },
  {
    "title": "核心课程",
    "items": ["数据结构", "算法", "数据库", "操作系统"]
  },
  {
    "title": "非技术能力",
    "items": ["团队协作", "沟通能力", "项目管理", "问题解决"]
  }
]
```

修改说明：
- 每个对象代表轮盘的一个部分
- `title`: 部分标题
- `items`: 该部分包含的项目列表

### 3. 修改进阶加分项

在 `config.json` 文件中找到 `advancedItems` 部分：

```json
"advancedItems": [
  {
    "title": "校园实践经历",
    "items": [
      {
        "main": "学生工作",
        "sub": "班长、学习委员等"
      },
      {
        "main": "实习经历",
        "sub": "XX公司技术部实习生，校外具体实习"
      },
      {
        "main": "校园项目",
        "sub": "技术栈JAVA+MySQL等"
      }
    ]
  }
]
```

修改说明：
- 每个对象代表一个3D滚轮
- `title`: 滚轮标题
- `items`: 该滚轮包含的项目列表
  - `main`: 大要点
  - `sub`: 小标题（中括号内的内容）

### 4. 修改兴趣爱好

在 `config.json` 文件中找到 `personalInfo.hobbies` 部分：

```json
"hobbies": [
  {
    "icon": "fa-code",
    "title": "编程",
    "description": "热爱编程，喜欢探索新技术"
  },
  {
    "icon": "fa-book",
    "title": "阅读",
    "description": "阅读技术书籍和科幻小说"
  },
  {
    "icon": "fa-camera",
    "title": "摄影",
    "description": "记录生活中的美好瞬间"
  }
]
```

修改说明：
- `icon`: Font Awesome 图标类名（例如：fa-code, fa-book, fa-camera）
- `title`: 兴趣爱好标题
- `description`: 兴趣爱好描述

### 5. 修改个人理念

在 `config.json` 文件中找到 `personalInfo.philosophy` 部分：

```json
"philosophy": [
  "持续学习，不断进步",
  "技术改变世界，创新引领未来",
  "代码质量是工程师的生命线"
]
```

修改说明：
- 每个字符串代表一条个人理念或名言

## 注意事项

1. **JSON格式**：确保修改后的文件仍然是有效的JSON格式，注意逗号、引号和括号的使用。
2. **图片链接**：头像可以使用网络图片链接，也可以使用本地图片路径（例如：`images/avatar.jpg`）。
3. **图标**：兴趣爱好使用的是Font Awesome图标，可以在 [Font Awesome官网](https://fontawesome.com/icons) 查找更多图标。
4. **保存文件**：修改完成后记得保存 `config.json` 文件。
5. **刷新页面**：修改后刷新浏览器页面即可看到更新后的内容。

## 查看页面

修改完成后，在浏览器中打开 `index.html` 文件即可查看您的个人主页。

如果需要本地服务器，可以使用以下命令：

```bash
# 使用Python
python -m http.server 8000

# 使用Node.js
npx http-server
```

然后在浏览器中访问 `http://localhost:8000` 即可。
